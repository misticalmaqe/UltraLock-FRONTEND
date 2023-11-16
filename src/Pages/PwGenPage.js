import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "../Components/NavBar";
import logoImage from "../Images/logo-01.png";
import refreshIcon from "../Images/icon-refresh.png";
import copyIcon from "../Images/icon-copy.png";

export function PwGenPage() {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(10);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [crackTime, setCrackTime] = useState("");
  const [showRefreshButton, setShowRefreshButton] = useState(false);

  const calculateEntropy = useCallback(() => {
    const entropy = Math.log2(26 ** passwordLength);
    return entropy;
  }, [passwordLength]);

  const convertSecondsToYears = (seconds) => {
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const hoursInDay = 24;
    const daysInYear = 365.25; // accounting for leap years

    return (
      seconds / (secondsInMinute * minutesInHour * hoursInDay * daysInYear)
    );
  };

  const calculateStrength = useCallback(
    (length) => {
      let strength = "";
      let timeToCrack = "";

      const entropy = calculateEntropy(length);

      if (entropy <= 35) {
        strength = "Weak";
        timeToCrack = Math.round(0.5 * 2 ** entropy);
      } else if (entropy <= 59) {
        strength = "Fair";
        timeToCrack = Math.round(0.5 * 2 ** entropy);
      } else if (entropy <= 119) {
        strength = "Good";
        timeToCrack = Math.round(0.5 * 2 ** entropy);
      } else if (entropy > 120) {
        strength = "Excellent";
        timeToCrack = Math.round(0.5 * 2 ** entropy);
      }
      return [strength, timeToCrack];
    },
    [calculateEntropy]
  );

  const generatePassword = useCallback(() => {
    const [strength, timeToCrack] = calculateStrength(passwordLength);
    setPasswordStrength(strength);
    setCrackTime(timeToCrack);

    const allChars = getCharacterSet(
      includeUppercase,
      includeLowercase,
      includeSpecialChars,
      includeNumbers
    );

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars.charAt(randomIndex);
    }

    setGeneratedPassword(password);
    setShowRefreshButton(true);
  }, [
    includeUppercase,
    includeLowercase,
    includeSpecialChars,
    includeNumbers,
    passwordLength,
    calculateStrength,
    setGeneratedPassword,
    setPasswordStrength,
    setCrackTime,
    setShowRefreshButton,
  ]);

  const calculateStrengthColor = (strength) => {
    switch (strength) {
      case "Weak":
        return "bg-red-500 text-white";
      case "Fair":
        return "bg-yellow-500 text-black";
      case "Good":
        return "bg-lime-500 text-black";
      case "Excellent":
        return "bg-green-500 text-white";
      default:
        return "bg-transparent text-black";
    }
  };

  const getCharacterSet = (upper, lower, special, numbers) => {
    const charSets = [];
    if (upper) charSets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (lower) charSets.push("abcdefghijklmnopqrstuvwxyz");
    if (special) charSets.push("!@#$%^&*()-_=+[]{}|;:'\",.<>/?`~");
    if (numbers) charSets.push("0123456789");

    return charSets.join("");
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [
    includeUppercase,
    includeLowercase,
    includeSpecialChars,
    includeNumbers,
    passwordLength,
    generatePassword,
  ]);

  return (
    <div className="flex flex-col items-center justify-center bg-background h-screen">
      <div className="w-40 h-40 mb-8 mt-4">
        <img
          src={logoImage}
          alt="UltraLock logo"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-col items-center w-full">
        <Navbar />
        <div className="w-full max-w-screen-md">
          <h1 className="text-xl font-bold mb-4 text-center">
            Generate robust, secure passwords effortlessly with our free
            password generator, ensuring enhanced online security.
          </h1>
          <div className="w-full">
            <p className="font-mono text-base mb-2 text-center max-w-full overflow-x-auto">
              {generatedPassword}
              {showRefreshButton && (
                <span
                  className="cursor-pointer text-blue-500 ml-2"
                  onClick={generatePassword}
                >
                  <img
                    src={refreshIcon}
                    alt="refresh Button"
                    className="w-5 h-5 inline-block"
                  />
                </span>
              )}
              {showRefreshButton && (
                <span
                  className="cursor-pointer text-blue-500 ml-2"
                  onClick={handleCopyPassword}
                >
                  <img
                    src={copyIcon}
                    alt="copy Button"
                    className="w-5 h-5 inline-block"
                  />
                </span>
              )}
            </p>
            <div
              className={`mt-2 p-2 rounded-md ${calculateStrengthColor(
                passwordStrength
              )}`}
              style={{ color: "black", textAlign: "center", maxWidth: "100%" }}
            >
              The password strength is {passwordStrength}
            </div>
            <p className="mb-2 text-center max-w-full overflow-x-auto">
              Estimated Time to Crack:{" "}
              {isNaN(crackTime)
                ? "Infinity"
                : crackTime % 1 === 0
                ? convertSecondsToYears(crackTime).toFixed(0)
                : convertSecondsToYears(crackTime).toFixed(2)}{" "}
              years
            </p>
            <label className="mt-4 flex items-center justify-center">
              Password Length:
              <input
                type="range"
                min="6"
                max="30"
                value={passwordLength}
                onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                className="ml-2 max-w-full"
              />
              {passwordLength}
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center">
            <label className="mr-4">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
              />
              Uppercase
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
              />
              Lowercase
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                checked={includeSpecialChars}
                onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
              />
              Special Characters
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
              />
              Numbers
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "../Components/NavBar";
import Checkbox from "../Components/Checkbox";
import logoImage from "../Images/logo-01.png";
import refreshIcon from "../Images/icon-refresh.png";
import copyIcon from "../Images/icon-copy.png";

export function PwGenPage() {
  // State variables
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(10);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [crackTime, setCrackTime] = useState("");
  const [showRefreshButton, setShowRefreshButton] = useState(false);

  // Calculate entropy based on the selected password length
  const calculateEntropy = useCallback(() => {
    // The formula for entropy is log2(number of possible combinations)
    const entropy = Math.log2(26 ** passwordLength);
    return entropy;
  }, [passwordLength]);

  // Convert seconds to years for better readability
  const convertSecondsToYears = (seconds) => {
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const hoursInDay = 24;
    const daysInYear = 365.25; // accounting for leap years

    return (
      seconds / (secondsInMinute * minutesInHour * hoursInDay * daysInYear)
    );
  };

  // Calculate password strength and estimated time to crack
  const calculateStrength = useCallback(
    (length) => {
      let strength = "";
      let timeToCrack = "";

      const entropy = calculateEntropy(length);

      // Password strength categories based on entropy
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

  // Generate a random password based on selected options
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

  // Determine the background color of the strength indicator based on password strength
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

  // Get the character set based on selected options
  const getCharacterSet = (upper, lower, special, numbers) => {
    const charSets = [];
    if (upper) charSets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (lower) charSets.push("abcdefghijklmnopqrstuvwxyz");
    if (special) charSets.push("!@#$%^&*()-_=+[]{}|;:'\",.<>/?`~");
    if (numbers) charSets.push("0123456789");

    return charSets.join("");
  };

  // Copy the generated password to the clipboard
  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
  };

  // Initial password generation on component mount
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

  // Component rendering
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
            {/* Display the generated password */}
            <p className="font-mono text-base mb-2 text-center max-w-full overflow-x-auto">
              {generatedPassword}
              {showRefreshButton && (
                // Allow refreshing the password
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
                // Allow copying the password to clipboard
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
            {/* Display the password strength */}
            <div
              className={`mt-2 p-2 rounded-md ${calculateStrengthColor(
                passwordStrength
              )}`}
              style={{ color: "black", textAlign: "center", maxWidth: "100%" }}
            >
              The password strength is {passwordStrength}
            </div>
            {/* Display the estimated time to crack the password */}
            <p className="mb-2 text-center max-w-full overflow-x-auto">
              Estimated Time to Crack:{" "}
              {isNaN(crackTime)
                ? "Infinity"
                : crackTime % 1 === 0
                ? convertSecondsToYears(crackTime).toFixed(0)
                : convertSecondsToYears(crackTime).toFixed(2)}{" "}
              years
            </p>
            {/* Slider to adjust the password length */}
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
          {/* Checkboxes to include/exclude character sets */}
          <div className="mt-4 flex flex-wrap items-center justify-center">
            <Checkbox
              label="Uppercase"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            <Checkbox
              label="Lowercase"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            <Checkbox
              label="Special Characters"
              checked={includeSpecialChars}
              onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
            />
            <Checkbox
              label="Numbers"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

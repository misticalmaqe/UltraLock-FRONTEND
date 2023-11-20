import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Navbar } from '../Components/NavBar';
import Checkbox from '../Components/Checkbox';
import logoImage from '../Images/logo-01.png';
import refreshIcon from '../Images/icon-refresh.png';
import copyIcon from '../Images/icon-copy.png';
import { UserContext } from '../provider/UserProvider';

export function PwGenPage() {
  // State variables
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(10);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [crackTime, setCrackTime] = useState(null); // Initialize to null
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const { authenticated, setAuthenticated } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);

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
      let strength = '';
      let timeToCrack = 0; // Initialize to 0 for the default case

      if (
        includeUppercase ||
        includeLowercase ||
        includeSpecialChars ||
        includeNumbers
      ) {
        const entropy = calculateEntropy(length);

        // Password strength categories based on entropy
        if (entropy <= 35) {
          strength = 'Weak';
          timeToCrack = Math.round(0.5 * 2 ** entropy);
        } else if (entropy <= 59) {
          strength = 'Fair';
          timeToCrack = Math.round(0.5 * 2 ** entropy);
        } else if (entropy <= 119) {
          strength = 'Good';
          timeToCrack = Math.round(0.5 * 2 ** entropy);
        } else if (entropy > 120) {
          strength = 'Excellent';
          timeToCrack = Math.round(0.5 * 2 ** entropy);
        }
      }

      return [strength, timeToCrack];
    },
    [
      calculateEntropy,
      includeUppercase,
      includeLowercase,
      includeSpecialChars,
      includeNumbers,
    ]
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

    let password = '';
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
      case 'Weak':
        return 'bg-red-500 text-white';
      case 'Fair':
        return 'bg-yellow-500 text-black';
      case 'Good':
        return 'bg-lime-500 text-black';
      case 'Excellent':
        return 'bg-green-500 text-white';
      default:
        return 'bg-transparent text-black';
    }
  };

  // Get the character set based on selected options
  const getCharacterSet = (upper, lower, special, numbers) => {
    const charSets = [];
    if (upper) charSets.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (lower) charSets.push('abcdefghijklmnopqrstuvwxyz');
    if (special) charSets.push('!@#$%^&*()-_=+[]{}|;:\'",.<>/?`~');
    if (numbers) charSets.push('0123456789');

    return charSets.join('');
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
  if (authenticated) {
    return (
      <div className="flex flex-col pt-[50px] items-center bg-background h-screen text-text">
        <img className="w-40" src={logoImage} alt="UltraLock logo" />
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-screen-md">
            <h1 className="text-xl font-bold my-10 text-center">
              Generate robust, secure passwords effortlessly with our free
              password generator, ensuring enhanced online security.
            </h1>
            <div className="flex flex-col items-center justify-center">
              {/* Display the generated password */}
              <p className="font-mono text-[1.4rem] mb-[20px] text-center max-w-full overflow-x-auto">
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
                      className="w-7 inline-block"
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
                      className="w-7 inline-block"
                    />
                  </span>
                )}
              </p>
              {/* Display the password strength */}
              <h1
                className={`my-[20px] p-2 rounded-md w-80 text-center ${calculateStrengthColor(
                  passwordStrength
                )}`}
              >
                The password strength is {passwordStrength}
              </h1>
              {/* Display the estimated time to crack the password */}
              <p className="mb-2 text-center max-w-full overflow-x-auto">
                {crackTime !== null ? (
                  <>
                    Estimated Time to Crack:{' '}
                    {isNaN(crackTime)
                      ? 'Infinity'
                      : crackTime % 1 === 0
                      ? convertSecondsToYears(crackTime).toFixed(0)
                      : convertSecondsToYears(crackTime).toFixed(2)}{' '}
                    years
                  </>
                ) : null}
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
                  className="mx-2 max-w-full accent-accent"
                />
                {passwordLength}
              </label>
            </div>
            {/* Checkboxes to include/exclude character sets */}
            <div className="mt-5 flex flex-wrap justify-center">
              <Checkbox
                label="Lowercase"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
              />
              <Checkbox
                label="Uppercase"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
              />
              <Checkbox
                label="Numbers"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
              />
              <Checkbox
                label="Special Characters"
                checked={includeSpecialChars}
                onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
              />
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    );
  } else {
    return <Navigate to="/onboarding" />;
  }
}

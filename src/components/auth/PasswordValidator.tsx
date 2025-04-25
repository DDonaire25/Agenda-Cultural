import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordValidatorProps {
  password: string;
}

interface Rule {
  test: (password: string) => boolean;
  message: string;
}

const rules: Rule[] = [
  {
    test: (password) => password.length >= 6,
    message: 'Al menos 6 caracteres'
  },
  {
    test: (password) => /[A-Z]/.test(password),
    message: 'Al menos una mayúscula'
  },
  {
    test: (password) => /[0-9]/.test(password),
    message: 'Al menos un número'
  },
  {
    test: (password) => /[!@#$%^&*]/.test(password),
    message: 'Al menos un carácter especial (!@#$%^&*)'
  }
];

export const PasswordValidator: React.FC<PasswordValidatorProps> = ({ password }) => {
  return (
    <div className="mt-2 space-y-2">
      {rules.map((rule, index) => {
        const passes = rule.test(password);
        return (
          <div
            key={index}
            className={`flex items-center text-sm ${
              passes ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {passes ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <X className="h-4 w-4 mr-2" />
            )}
            {rule.message}
          </div>
        );
      })}
    </div>
  );
};
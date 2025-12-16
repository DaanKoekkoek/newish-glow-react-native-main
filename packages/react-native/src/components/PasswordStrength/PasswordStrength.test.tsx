import { render } from "_test-utils";
import React from "react";

import {
  PASSWORD_STRENGTH_INDICATOR_LABEL,
  PASSWORD_STRENGTH_REQUIREMENTS_LABELS,
  PasswordStrength,
} from "./PasswordStrength";

describe("<PasswordStrength />", () => {
  it("renders correctly basic PasswordStrength with a good password", () => {
    const { toJSON } = render(<PasswordStrength password="hola1!Alo" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("Strength indicator shows correctly a bad password", () => {
    const { getAllByTestId } = render(<PasswordStrength password="hola" />);
    const progressBarsWithGoodStrengthLevel = getAllByTestId(
      "strength-progress-bar-bad",
    );
    expect(progressBarsWithGoodStrengthLevel.length).toBe(1);
  });

  it("Strength indicator shows correctly an ok password", () => {
    const { getAllByTestId } = render(<PasswordStrength password="hola1!" />);
    const progressBarsWithGoodStrengthLevel = getAllByTestId(
      "strength-progress-bar-ok",
    );
    expect(progressBarsWithGoodStrengthLevel.length).toBe(3);
  });

  it("Strength indicator shows correctly a good password", () => {
    const { getAllByTestId } = render(
      <PasswordStrength password="hola1!Alo" />,
    );
    const progressBarsWithGoodStrengthLevel = getAllByTestId(
      "strength-progress-bar-good",
    );
    expect(progressBarsWithGoodStrengthLevel.length).toBe(5);
  });

  it("should fire the onPasswordComplete callback with the password and the password strength", () => {
    const mockCompleteHandler = jest.fn();
    const mockPasswordNth1 = "hola1!";

    expect(mockCompleteHandler).not.toHaveBeenCalled();

    const { rerender } = render(
      <PasswordStrength
        password={mockPasswordNth1}
        onChange={mockCompleteHandler}
      />,
    );

    expect(mockCompleteHandler).toHaveBeenNthCalledWith(
      1,
      mockPasswordNth1,
      "ok",
    );

    const mockPasswordNth2 = "hola1!Alo";

    rerender(
      <PasswordStrength
        password={mockPasswordNth2}
        onChange={mockCompleteHandler}
      />,
    );

    expect(mockCompleteHandler).toHaveBeenNthCalledWith(
      2,
      mockPasswordNth2,
      "good",
    );
  });

  it("sets the strengthIndicatorLabel, requirementsSummary, requirementsLabels, strengthLabels or defaults", () => {
    const mockCompleteHandler = jest.fn();

    const { rerender, queryByText } = render(
      <PasswordStrength
        showRequirements
        password=""
        onChange={mockCompleteHandler}
      />,
    );

    expect(queryByText(PASSWORD_STRENGTH_INDICATOR_LABEL)).toBeDefined();
    Object.values(PASSWORD_STRENGTH_REQUIREMENTS_LABELS).forEach((label) => {
      expect(queryByText(label)).toBeDefined();
    });

    const LOCALIZED_PASSWORD_STRENGTH_INDICATOR_LABEL = "This password is";
    const LOCALIZED_PASSWORD_STRENGTH_REQUIREMENTS_SUMMARY =
      "Password must contain:";
    const LOCALIZED_PASSWORD_STRENGTH_REQUIREMENTS_LABELS = {
      minimumCharacters: "Minimum 8 characters",
      lowerCaseLetters: "Minimum 1 lower case letter",
      upperCaseLetters: "Minimum 1 upper case letter",
      numbers: "Numbers",
      specialCharacters: "Special characters",
    };

    rerender(
      <PasswordStrength
        password=""
        showRequirements
        onChange={mockCompleteHandler}
        strengthIndicatorLabel={LOCALIZED_PASSWORD_STRENGTH_INDICATOR_LABEL}
        requirementsSummary={LOCALIZED_PASSWORD_STRENGTH_REQUIREMENTS_SUMMARY}
        requirementsLabels={LOCALIZED_PASSWORD_STRENGTH_REQUIREMENTS_LABELS}
      />,
    );

    expect(
      queryByText(LOCALIZED_PASSWORD_STRENGTH_INDICATOR_LABEL),
    ).toBeDefined();
    expect(
      queryByText(LOCALIZED_PASSWORD_STRENGTH_REQUIREMENTS_SUMMARY),
    ).toBeDefined();
    Object.values(LOCALIZED_PASSWORD_STRENGTH_REQUIREMENTS_LABELS).forEach(
      (label) => {
        expect(queryByText(label)).toBeDefined();
      },
    );
  });
});

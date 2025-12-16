import { render, screen } from "@testing-library/react";
import { PasswordStrength } from "./PasswordStrength";
import {
  PASSWORD_STRENGTH_INDICATOR_LABEL,
  PASSWORD_STRENGTH_PROGRESS_INDICATOR_TESTID,
  PASSWORD_STRENGTH_REQUIREMENTS_LABELS,
} from "./PasswordStrength.constants";

describe("<PasswordStrength />", () => {
  it("Strength indicator shows correctly a 'bad' password, it only satisfies the requirement of 'minimum 1 lower case letter'", () => {
    render(<PasswordStrength password="hola" />);

    const [first, second, third, fourth, fifth] = screen.getAllByTestId(
      PASSWORD_STRENGTH_PROGRESS_INDICATOR_TESTID,
    ) as HTMLDivElement[];

    expect(first.classList).toContain("bad");
    expect(second.classList).toContain("default");
    expect(third.classList).toContain("default");
    expect(fourth.classList).toContain("default");
    expect(fifth.classList).toContain("default");
  });

  it("Strength indicator shows correctly a 'bad' password, it only satisfies the requirements of 'minimum 1 lower case letter' and 'numbers'", () => {
    render(<PasswordStrength password="hola1" />);

    const [first, second, third, fourth, fifth] = screen.getAllByTestId(
      PASSWORD_STRENGTH_PROGRESS_INDICATOR_TESTID,
    ) as HTMLDivElement[];

    expect(first.classList).toContain("bad");
    expect(second.classList).toContain("bad");
    expect(third.classList).toContain("default");
    expect(fourth.classList).toContain("default");
    expect(fifth.classList).toContain("default");
  });

  it("Strength indicator shows correctly an 'ok' password, it satisfies the requirements of 'Minimum 1 lower case letter', 'numbers', and 'special characters'", () => {
    render(<PasswordStrength password="hola1!" />);

    const [first, second, third, fourth, fifth] = screen.getAllByTestId(
      PASSWORD_STRENGTH_PROGRESS_INDICATOR_TESTID,
    ) as HTMLDivElement[];

    expect(first.classList).toContain("ok");
    expect(second.classList).toContain("ok");
    expect(third.classList).toContain("ok");
    expect(fourth.classList).toContain("default");
    expect(fifth.classList).toContain("default");
  });

  it("Strength indicator shows correctly an 'ok' password, it satisfies the requirements of 'Minimum 1 lower case letter', 'numbers', 'special characters', and 'Minimum 1 upper case letter'", () => {
    render(<PasswordStrength password="hola1!A" />);

    const [first, second, third, fourth, fifth] = screen.getAllByTestId(
      PASSWORD_STRENGTH_PROGRESS_INDICATOR_TESTID,
    ) as HTMLDivElement[];

    expect(first.classList).toContain("ok");
    expect(second.classList).toContain("ok");
    expect(third.classList).toContain("ok");
    expect(fourth.classList).toContain("ok");
    expect(fifth.classList).toContain("default");
  });

  it("Strength indicator shows correctly a good password, it satisfies all requirements", () => {
    render(<PasswordStrength password="hola1!Alo" />);

    const [first, second, third, fourth, fifth] = screen.getAllByTestId(
      PASSWORD_STRENGTH_PROGRESS_INDICATOR_TESTID,
    ) as HTMLDivElement[];

    expect(first.classList).toContain("good");
    expect(second.classList).toContain("good");
    expect(third.classList).toContain("good");
    expect(fourth.classList).toContain("good");
    expect(fifth.classList).toContain("good");
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
    const { rerender } = render(
      <PasswordStrength
        showRequirements
        password=""
        onChange={mockCompleteHandler}
      />,
    );

    expect(screen.getByText(PASSWORD_STRENGTH_INDICATOR_LABEL)).toBeDefined();

    Object.values(PASSWORD_STRENGTH_REQUIREMENTS_LABELS).forEach((label) => {
      expect(screen.getByText(label)).toBeDefined();
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
      screen.getByText(LOCALIZED_PASSWORD_STRENGTH_REQUIREMENTS_SUMMARY),
    ).toBeDefined();
    expect(
      screen.getByText(LOCALIZED_PASSWORD_STRENGTH_INDICATOR_LABEL),
    ).toBeDefined();

    Object.values(LOCALIZED_PASSWORD_STRENGTH_REQUIREMENTS_LABELS).forEach(
      (label) => {
        expect(screen.getByText(label)).toBeDefined();
      },
    );
  });
});

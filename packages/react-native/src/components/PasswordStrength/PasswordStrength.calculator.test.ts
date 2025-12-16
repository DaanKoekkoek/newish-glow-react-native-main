import { calculatePasswordStrength } from "./PasswordStrength.calculator";

describe("calculatePasswordStrength()", () => {
  it("calculates correctly a BAD password", () => {
    const mockPassword = "hola";

    const [requirementsMet, strengthLevel] =
      calculatePasswordStrength(mockPassword);

    expect(strengthLevel).toBe("bad");
    expect(requirementsMet.has("lowerCaseLetters")).toBe(true);
    expect(requirementsMet.size).toBe(1);
  });

  it("calculates correctly an OK password", () => {
    const mockPassword = "hola1$";

    const [requirementsMet, strengthLevel] =
      calculatePasswordStrength(mockPassword);

    expect(strengthLevel).toBe("ok");
    expect(requirementsMet.size).toBe(3);
  });

  it("calculates correctly a GOOD password", () => {
    const mockPassword = "hola1$AAA";

    const [requirementsMet, strengthLevel] =
      calculatePasswordStrength(mockPassword);

    expect(strengthLevel).toBe("good");
    expect(requirementsMet.size).toBe(5);
  });
});

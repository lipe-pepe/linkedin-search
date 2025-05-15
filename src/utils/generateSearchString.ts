function joinList(list: string[], joiner: "OR" | "AND") {
  let string = "(";
  for (let i = 0; i < list.length; i++) {
    if (string !== "(") {
      string += joiner;
    }
    string += `"${list[i]}"`;
  }
  string += ")";
  return string;
}

export function generateSearchString(
  mandatoryList: string[],
  includeList: string[],
  excludeList: string[]
) {
  let string = "";

  const hasMandatory = mandatoryList.length > 0;
  const hasInclude = includeList.length > 0;
  const hasExclude = excludeList.length > 0;

  if (hasMandatory) string += joinList(mandatoryList, "AND");

  if (hasInclude) {
    if (hasMandatory) string += "AND";
    string += joinList(includeList, "OR");
  }

  if (hasExclude) {
    if (hasMandatory || hasInclude) string += "AND%20NOT";
    string += joinList(excludeList, "OR");
  }

  return string;
}

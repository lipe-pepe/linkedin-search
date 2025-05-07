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

  string += joinList(mandatoryList, "AND");

  if (includeList.length > 0) {
    string += "AND";
    string += joinList(includeList, "OR");
  }

  if (excludeList.length > 0) {
    string += "AND%20NOT";
    string += joinList(excludeList, "OR");
  }

  return string;
}

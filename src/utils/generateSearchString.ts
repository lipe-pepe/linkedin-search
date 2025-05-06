function joinList(list: string[], joiner: "OR") {
  let string = "(";
  for (let i = 0; i < list.length; i++) {
    if (string !== "") {
      string += joiner;
    }
    string += `"${list[i]}"`;
  }
  string += ")";
  return string;
}

export function generateSearchString(
  includeList: string[],
  excludeList: string[]
) {
  let string = "";

  string += joinList(includeList, "OR");

  if (excludeList.length > 0) {
    string += "AND%20NOT";
    string += joinList(excludeList, "OR");
  }

  return string;
}

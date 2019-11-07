import jss from "jss";

export const generateClassNames = (stylesBlob: any): any => {
  const sheet = jss.createStyleSheet(stylesBlob, {
    classNamePrefix: "testing-"
  });
  sheet.attach();
  return sheet.classes;
};

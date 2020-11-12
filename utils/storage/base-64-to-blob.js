// https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
const base64ToBlob = string => {
  if (string instanceof Blob) return string;
  if (!string) return;

  let byteString;
  if (typeof string === "string" && string.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(string.split(",")[1]);
  else byteString = unescape(string.split(",")[1]);
  const mimeString = string.split(",")[0].split(":")[1].split(";")[0];
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
};
export default base64ToBlob;

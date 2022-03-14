export const base64ToPng = async (img: string) => {
  return fetch(img)
    .then((res) => res.blob())
    .then((blob) => {
      return new File([blob], "File name", { type: "image/png" });
    });
};

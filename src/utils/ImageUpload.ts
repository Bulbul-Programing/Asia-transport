export const hostImages = async (imageData: File[]) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME;
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const uploadPreset = "my_unsigned_upload";

  const uploadedUrls: string[] = [];

  for (let i = 0; i < imageData.length; i++) {
    const formData = new FormData();

    formData.append("file", imageData[i]);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Cloudinary upload failed:", await response.text());
        continue;
      }

      const data = await response.json();

      if (data.secure_url) {
        uploadedUrls.push(data.secure_url);
      } else {
        console.error("Invalid Cloudinary response:", data);
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  }

  return uploadedUrls;
};

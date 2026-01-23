export function setupQuillImageHandler(quillInstance: any, projectId?: string) {
  if (!quillInstance) return;
  
  const toolbar = quillInstance.getModule("toolbar");
  if (!toolbar) return;

  toolbar.addHandler("image", async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("Image size must be less than 5MB");
        return;
      }

      try {
        const response = await fetch("/api/upload/presigned-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId: projectId || `temp-${Date.now()}`,
            filename: file.name,
            type: "cover",
            contentType: file.type,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get presigned URL");
        }

        const { presignedUrl, url } = await response.json();

        const uploadResponse = await fetch(presignedUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const range = quillInstance.getSelection(true);
        quillInstance.insertEmbed(range.index, "image", url, "user");
        quillInstance.setSelection(range.index + 1);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    };
  });
}

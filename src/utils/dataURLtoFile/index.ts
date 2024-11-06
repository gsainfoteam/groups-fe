export async function dataUrlToFile(
  dataUrl: string,
  fileName: string,
): Promise<File> {
  if (!dataUrl?.trim()) {
    throw new Error("Invalid dataUrl.");
  }
  if (!fileName?.trim()) {
    throw new Error("Invalid fileName.");
  }
  try {
    const res: Response = await fetch(dataUrl);
    if (!res.ok) {
      throw new Error("Failed to fetch the image.");
    }
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: "image/png" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred during file conversion: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred during file conversion.");
    }
  }
}

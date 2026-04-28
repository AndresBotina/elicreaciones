/**
 * Returns the first image URL from a product's imagenes array.
 * Returns null if the array is empty or undefined — components
 * should render the placeholder when this returns null.
 */
export function getFirstImage(imagenes) {
  return imagenes?.find(Boolean) ?? null;
}

/**
 * Returns true if the product has at least one image uploaded.
 */
export function hasImages(imagenes) {
  return Array.isArray(imagenes) && imagenes.length > 0;
}

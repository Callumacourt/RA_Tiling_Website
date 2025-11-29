async function fetchGallery(): Promise<string[]> {
    const response = await fetch('/fetch-gallery');
    if (!response.ok) throw new Error('Failed to fetch gallery');
    return response.json();
}

export default fetchGallery;
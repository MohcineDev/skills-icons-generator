import data from "./simple-icons.json";
 
 
export const icons = data.map((icon) => {
  const title = icon.title.toLowerCase();
  
  const slug = title
    .replace(/\+/g, "plus")
    .replace(/\./g, "dot")
    .replace(/[^a-z0-9]/g, "");

  return {
    name: icon.title,
    slug: slug,
    hex: icon.hex,
    searchTerms: [
      slug, 
      title,
      title.replace("adobe ", ""),  
      title.replace("visual studio ", ""), 
      title.replace(/\s/g, "")  
    ]
  };
});
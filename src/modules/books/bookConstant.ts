export const bookFilterableFields: string[] = [
    'search',
    'minPrice',
    'maxPrice',
    'category',
  
    
];

export const bookSearchableFields: string[] = [
    'title',
    'author',
    'genre',
   
    
];
export const bookRelationalFields: string[] = [
    'categoryId',
];
export const bookRelationalFieldsMapper: { [key: string]: string } = {
    categoryId: 'category',
 
};
export type IBookFilterRequest = {
    search?: string | undefined;
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    
}
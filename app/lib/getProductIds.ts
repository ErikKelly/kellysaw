import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { Product } from "../types/product";

// This is ONLY for build-time static generation
export function getProductIds(): string[] {
  try {
const csvPath = path.join(process.cwd(), 'public/data/product-data-20250620.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    
    const result = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });
    
    const data = result.data as Product[];
    return data
      .map(item => item["Item Number"])
      .filter(id => id); // Remove empty IDs
  } catch (error) {
    console.error('Error reading product IDs for static generation:', error);
    return [];
  }
}
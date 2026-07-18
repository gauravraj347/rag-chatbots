import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import pdfParse from 'pdf-parse';

import {
  DocumentLoader,
  LoadedDocument,
} from '../document.interface';

@Injectable()
export class PdfLoader implements DocumentLoader {
  async load(filePath: string): Promise<LoadedDocument> {
    const buffer = fs.readFileSync(filePath);

    const pdf = await pdfParse(buffer);

    return {
      content: pdf.text,
      metadata: {
        pages: pdf.numpages,
        version: pdf.version,
      },
    };
  }
}
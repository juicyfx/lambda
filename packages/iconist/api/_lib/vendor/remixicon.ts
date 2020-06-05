import cheerio from "cheerio";
import path from "path";
import { readFile, lowercase } from "../utils";

export async function generate(req: IconRequest): Promise<string> {
  try {
    // Read icon file
    var file = await readFile(path.resolve('node_modules', `@obr/remixicon/dist/${lowercase(req.spec)}/${req.icon}.svg`));
  } catch (e) {
    throw `Remixicon ${req.icon}.svg not found`;
  }

  // Parse SVG to AST
  const $ = cheerio.load(file.toString('utf-8'));
  const $svg = $('svg');

  // Update attributes
  if (req.color) {
    $svg.attr('color', `#${req.color}`);
    $svg.attr('fill', `#${req.color}`);
  }

  $svg.attr('width', String(req.size));
  $svg.attr('height', String(req.size));

  // Export icon
  const svg = $.html('svg');

  return svg;
}

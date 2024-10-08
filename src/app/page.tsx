'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const cmToMm = (cm: number): number => cm * 10;

const inchesToMm = (inches: number): number => inches * 25.4;

const getCostPerSheet = (sheets: number): number => {
  if (sheets === 0) return 0;
  if (sheets === 1) return 1800;
  if (sheets <= 4) return 1400 * sheets;
  if (sheets <= 9) return 1300 * sheets;
  if (sheets <= 14) return 1200 * sheets;
  if (sheets <= 19) return 1100 * sheets;

  return 1000 * sheets;
};

const LOGO_GAP = 3;
const CONTAINER_WIDTH = 12.4 * 25.4;
const CONTAINER_HEIGHT = 18.6 * 25.4;

const getMaxRectangles = (
  rectangleWidth: number,
  rectangleHeight: number
): number => {
  const horizontalCount = Math.floor(
    (CONTAINER_WIDTH + LOGO_GAP) / (rectangleWidth + LOGO_GAP)
  );
  const verticalCount = Math.floor(
    (CONTAINER_HEIGHT + LOGO_GAP) / (rectangleHeight + LOGO_GAP)
  );
  const normalOrientation = horizontalCount * verticalCount;

  const rotatedHorizontalCount = Math.floor(
    (CONTAINER_WIDTH + LOGO_GAP) / (rectangleHeight + LOGO_GAP)
  );
  const rotatedVerticalCount = Math.floor(
    (CONTAINER_HEIGHT + LOGO_GAP) / (rectangleWidth + LOGO_GAP)
  );
  const rotatedOrientation = rotatedHorizontalCount * rotatedVerticalCount;

  return Math.max(normalOrientation, rotatedOrientation);
};

export default function Home() {
  const [unit, setUnit] = useState<'inch' | 'cm'>('cm');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [sheets, setSheets] = useState('1');
  const [logos, setLogos] = useState(0);
  const [costPerLogo, setCostPerLogo] = useState(0);
  const [costPerSheet, setCostPerSheet] = useState(0);

  const widthInNumber = parseFloat(width);
  const heightInNumber = parseFloat(height);

  useEffect(() => {
    const widthInMm =
      unit === 'inch' ? inchesToMm(widthInNumber) : cmToMm(widthInNumber);
    const heightInMm =
      unit === 'inch' ? inchesToMm(heightInNumber) : cmToMm(heightInNumber);
    const sheetsInNumber = parseFloat(sheets);

    const totalLogos = getMaxRectangles(widthInMm, heightInMm) * sheetsInNumber;
    const perSheetCost = getCostPerSheet(sheetsInNumber);
    console.log(isNaN(perSheetCost));
    setLogos(totalLogos);
    setCostPerSheet(perSheetCost);
    setCostPerLogo(Math.round((perSheetCost / totalLogos) * 100) / 100);
  }, [height, width, sheets, unit, widthInNumber, heightInNumber]);

  const handleValueChange = (val: 'cm' | 'inch') => setUnit(val);

  return (
    <div className="container mx-auto max-w-screen-lg h-screen my-2">
      <Card className="pt-4 mx-2 mt-2">
        <CardContent>
          <ToggleGroup
            type="single"
            value={unit}
            onValueChange={handleValueChange}
          >
            <ToggleGroupItem value="cm" aria-label="Toggle cm">
              <p className="text-base">cm</p>
            </ToggleGroupItem>
            <ToggleGroupItem value="inch" aria-label="Toggle Inch">
              <p className="text-base">Inch</p>
            </ToggleGroupItem>
          </ToggleGroup>
        </CardContent>
      </Card>

      <Card className="pt-4 mx-2 mt-2">
        <CardContent>
          <div className="grid grid-cols-1 gap-y-2">
            <div className="grid max-w-sm items-center gap-1.5 grid-cols-[_100px_1fr]">
              <Label htmlFor="width" className="text-lg">
                Width
              </Label>
              <Input
                type="number"
                id="width"
                placeholder="Logo Width"
                className="w-full focus:outline-white text-base"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>

            <div className="grid max-w-sm items-center gap-1.5 grid-cols-[_100px_1fr]">
              <Label htmlFor="height" className="text-lg">
                Height
              </Label>
              <Input
                type="number"
                id="height"
                placeholder="Logo Height"
                className="w-full focus:outline-white text-base"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className="grid max-w-sm items-center gap-1.5 grid-cols-[_100px_1fr]">
              <Label htmlFor="sheets" className="text-lg">
                Sheets
              </Label>
              <Input
                type="number"
                max={5}
                id="sheets"
                placeholder="Number of sheets"
                className="w-full focus:outline-white text-base"
                value={sheets}
                onChange={(e) => setSheets(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="pt-4 mx-2 mt-2">
        <CardContent>
          <div>
            <p className="text-2xl text-center">
              <span className="font-bold">
                {!isNaN(logos) ? Math.floor(logos) : 0}
              </span>{' '}
              Logos
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="pt-4 mx-2 mt-2">
        <CardContent>
          <p className="text-center text-2xl font-bold">
            ₹{!isNaN(costPerSheet) ? costPerSheet : 0}
          </p>
        </CardContent>
      </Card>

      <Card className="pt-4 mx-2 mt-2">
        <CardContent>
          <p className="mt-1">
            * ₹{!isNaN(costPerLogo) ? costPerLogo : 0} / logo
          </p>
        </CardContent>
      </Card>

      <Card className="pt-4 mx-2 mt-2">
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                Price per Sheet
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sheets</TableHead>
                      <TableHead>Price per Sheet</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>₹1800</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2 - 4</TableCell>
                      <TableCell>₹1400</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5 - 9</TableCell>
                      <TableCell>₹1300</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>10 - 14</TableCell>
                      <TableCell>₹1200</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>15 - 19</TableCell>
                      <TableCell>₹1100</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>20+</TableCell>
                      <TableCell>₹1000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import Image from 'next/image';
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
          <div className="grid grid-cols-1 gap-y-2 ">
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

      <Card className="pt-4 mx-2 mt-2">
        <CardContent>
          <div className="flex items-center justify-center space-x-4 p-4 bg-white">
            <Image
              className="w-16 h-16 rounded-full"
              height="16"
              width="16"
              src="/images/logo.svg"
              alt="Anchery Design company logo"
            />
            <div className="flex flex-col space-y-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Anchery Designs
              </h2>
              <a
                href="mailto:ancherydesigns@gmail.com"
                className="text-sm text-gray-600 flex items-center hover:text-blue-600 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                ancherydesigns@gmail.com
              </a>
              <a
                href="tel:+919847842728"
                className="text-sm text-gray-600 flex items-center hover:text-blue-600 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +91 9847842728
              </a>
              <p className="text-sm text-gray-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Near Kaloor Metro Station, Kochi
              </p>
              <a
                href="https://maps.app.goo.gl/numcmiXSYSkm5Ysx8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View on Google Maps
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

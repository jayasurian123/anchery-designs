'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useEffect, useState } from 'react';

const inchesToMm = (inches: number): number => {
  return inches * 25.4;
};

const getCostPerSheet = (sheet: number): number => {
  const costs = [0, 2000, 3000, 4500, 6000, 7000];
  return costs[sheet] || 0;
};

const LOGO_GAP = 3; // 3mm gap between rectangles
const CONTAINER_WIDTH = 12.4 * 25.4; // in mm
const CONTAINER_HEIGHT = 18.6 * 25.4; // in mm

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
  const [unit, setUnit] = useState<'inch' | 'cm'>('inch');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [sheets, setSheets] = useState('1');
  const [logos, setLogos] = useState(0);
  const [costPerLogo, setCostPerLogo] = useState(0);
  const [costPerSheet, setCostPerSheet] = useState(0);

  useEffect(() => {
    const widthInNumber = inchesToMm(parseFloat(width));
    const heightInNumber = inchesToMm(parseFloat(height));
    const sheetsInNumber = parseFloat(sheets);

    const totalLogos =
      getMaxRectangles(widthInNumber, heightInNumber) * sheetsInNumber;
    setLogos(totalLogos);

    const perSheetCost = getCostPerSheet(sheetsInNumber);
    setCostPerSheet(perSheetCost);

    setCostPerLogo(Math.round((perSheetCost / totalLogos) * 100) / 100);

    return () => {};
  }, [height, width, sheets]);

  function handleValueChange(val: 'cm' | 'inch') {
    setUnit(val);
  }

  return (
    <div className="container mx-auto max-w-screen-lg  h-screen my-2">
      <Card className="pt-4 mx-2 mt-2">
        <CardContent>
          <ToggleGroup
            type="single"
            value={unit}
            onValueChange={handleValueChange}
          >
            <ToggleGroupItem value="inch" aria-label="Toggle Inch">
              <p className="text-base">Inch</p>
            </ToggleGroupItem>
            <ToggleGroupItem value="cm" aria-label="Toggle cm">
              <p className="text-base">cm</p>
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
            {!isNaN(logos) ? (
              <p className="text-2xl text-center">
                <span className="font-bold">{Math.floor(logos)}</span> Logos
              </p>
            ) : (
              <p className="text-2xl text-center">
                <span className="font-bold">0</span> Logos
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="pt-4 mx-2 mt-2">
        <CardContent>
          <p className="text-center text-2xl font-bold">₹{costPerSheet}</p>
        </CardContent>
      </Card>

      <Card className="pt-4 mx-2 mt-2">
        <CardContent>
          {!isNaN(costPerLogo) ? (
            <p className="mt-1">* ₹{costPerLogo} / logo</p>
          ) : (
            <p className="mt-1">* ₹0 / logo</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// 1 Sheet (216 Square inch)  = Rs.2000
// 2 Sheet (432 Square inch)  = Rs.3000 (Rs.7/Square inch)
// 3 Sheet (648 Square inch)  = Rs.4500 (Rs.7/Square inch)
// 4 Sheet (864 Square inch)  = Rs.6000 (Rs.7/Square inch)
// 5 Sheet (1080 Square inch) = Rs.7000 (Rs.6.5/Square inch)

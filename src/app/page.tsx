'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

const getCostPerSheet = (sheet: number) => {
  switch (sheet) {
    case 0:
      return 0;
    case 1:
      return 2000;
    case 2:
      return 3000;
    case 3:
      return 4500;
    case 4:
      return 6000;
    case 5:
      return 7000;
    default:
      return 0;
  }
};

export default function Home() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [sheets, setSheets] = useState('1');
  const [logos, setLogos] = useState(0);
  const [costPerLogo, setCostPerLogo] = useState(0);
  const [costPerSheet, setCostPerSheet] = useState(0);

  useEffect(() => {
    const widthInNumber = parseFloat(width);
    const heightInNumber = parseFloat(height);
    const sheetsInNumber = parseFloat(sheets);

    const area = widthInNumber * heightInNumber;
    const totalLogos = (sheetsInNumber * (12 * 18)) / area;
    setLogos(totalLogos);

    const perSheetCost = getCostPerSheet(sheetsInNumber);
    setCostPerSheet(perSheetCost);

    setCostPerLogo(Math.round((perSheetCost / totalLogos) * 100) / 100);

    return () => {};
  }, [height, width, sheets]);

  return (
    <div className="container mx-auto max-w-screen-lg  h-screen my-2">
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

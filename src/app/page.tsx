import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Home() {
  return (
    <div className="container mx-auto max-w-screen-lg bg-slate-100 h-screen my-2">
      <Card className="pt-4 mx-2">
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
                className="w-full focus:outline-white"
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
                className="w-full focus:outline-white"
              />
            </div>

            <div className="grid max-w-sm items-center gap-1.5 grid-cols-[_100px_1fr]">
              <Label htmlFor="height" className="text-lg">
                Sheets
              </Label>
              <Input
                type="number"
                id="height"
                placeholder="Logo Height"
                className="w-full focus:outline-white"
                defaultValue={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="pt-4 mx-2 mt-2">
        <CardContent>
          <div>
            <p className="text-2xl text-center">
              <span className="font-bold">50</span> Logos
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="pt-4 mx-2 mt-2">
        <CardContent>
          <p className="text-center text-2xl font-bold">₹1836</p>
        </CardContent>
      </Card>

      <Card className="pt-4 mx-2 mt-2">
        <CardContent>
          <p className="mt-1">* ₹8.5 / Square inch</p>
          <p className="mt-1">* ₹8.5 / Square inch</p>
        </CardContent>
      </Card>
    </div>
  );
}

/*
1 Sheet (216 Square inch)  = Rs.1836 (Rs.8.5/Square inch)
2 Sheet (432 Square inch)  = Rs.3000 (Rs.7/Square inch)
3 Sheet (648 Square inch)  = Rs.4500 (Rs.7/Square inch)
4 Sheet (864 Square inch)  = Rs.6000 (Rs.7/Square inch)
5 Sheet (1080 Square inch) = Rs.7000 (Rs.6.5/Square inch)
 */

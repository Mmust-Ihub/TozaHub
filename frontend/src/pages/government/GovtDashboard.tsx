import { Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { useEffect, useState } from "react";


export type UnpaidDues = {
  pending: number;
  saccosWithUnpaidDues: number;
  totalUnpaidAmount: {
    $numberDecimal : string;
  }
};

type Sacco = {
  email: string;
  name: string;
  pending: {
    $numberDecimal : string;
  }
};

function GovtDashboard() {
  useEffect(() => {
    Summary();
    SaccoSummary();
  },[]);
  const [summary, setSummary] = useState<UnpaidDues>();
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [saccos, setSaccos] = useState<Sacco[]>();
  const [loadingSaccos, setLoadingSaccos] = useState(true);

  async function SaccoSummary (){
   try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/agent/saccos/summary`);
    if (res.ok) {
      const data: Sacco[] = await res.json();
      setSaccos(data);
      console.log(data);
    }
   } catch (error) {
      console.log(error);
    }
    finally{
      setLoadingSaccos(false);
    }
  }


  async function Summary() {
    console.log("fetching summary", import.meta.env.VITE_BACKEND_URI,"/agent/summary");
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/agent/summary`);
    if (res.ok) {
      const data: UnpaidDues[] = await res.json();
      setSummary(data[0]);
      console.log("fetching summary...");
      console.log(data);
    }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoadingSummary(false);
    }
  }
  return (
    <div>
      <div className="p-4 md:pb-8">
        <h1 className="text-2xl font-bold tracking-tight">Government Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage all registered public service vehicles</p>
      </div>
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:p-4">
      {loadingSummary ? (
        <div className="flex flex-col items-center justify-center h-32">
          <Loader className="h-8 w-8 animate-spin" />
          <p>Loading Sacco</p>
        </div>
      ) : (
        Object.entries(summary || {}).map(([key, value]) => (
          <Card key={key}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-500 text-lg">{key == "totalUnpaidAmount"? key.replace(/([A-Z])/g, " $1").trim()+ " (KES)" : key.replace(/([A-Z])/g, " $1").trim()}</CardTitle> 
              </div>
            </CardHeader>
            <CardContent>
              <h1 className="text-2xl font-bold  text-start">
                {typeof value === "object" && value?.$numberDecimal
                  ? value.$numberDecimal
                  : String(value)}
              </h1>
            </CardContent>
          </Card>
        ))
      )}
    </div>
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-700 mt-10 tracking-wide">Sacco with Debt</h2>
     <div>
     <div className="overflow-x-auto grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 bg-blue-100 mt-4">
        <h3 className="text-gray-500 text-lg md:text-xl font-semibold tracking-wide">Sacco Name</h3>
        <h3 className="text-gray-500 text-lg md:text-xl font-semibold tracking-wide">Pending Debt (KES)</h3>
        <h3 className="text-gray-500 text-lg md:text-xl font-semibold tracking-wide">Email</h3>
      </div>
      <hr className="border-gray-500 mt-1"/>
      {loadingSummary ? (
        <div className="flex flex-col items-center justify-center h-32">
          <Loader className="h-8 w-8 animate-spin" />
          <p>Loading Sacco</p>
        </div>):(
          <div>
            {
              saccos?.map((sacco, index) => (
                  <div>
                    <div key={index} className="grid grid-cols-3 mb-2 md:grid-cols-3 gap-4 md:gap-6">
                    <p className="  text-lg tracking-wide">{sacco.name}</p>
                    <p className="px-4 text-lg tracking-wide font-bold text-gray-500">{sacco.pending.$numberDecimal}</p>
                    <p className=" text-lg tracking-wide ">{sacco.email}</p>
                    </div>
                    <hr className="border-gray-200 my-1"/>
                  </div>
                )
              )
            }
          </div>
        )}
     </div>
    </div>
    </div>
  )
}

export default GovtDashboard
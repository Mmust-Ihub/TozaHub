import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

type Transaction = {
  amount: { $numberDecimal: string };
  createdAt: string;
  narrative: string;
  number_plate: string;
  status: string;
  trans_type: string;
  updatedAt: string;
  __v: number;
};

function GovtSummary() {
  const location = useLocation();
  
  const { email, name } = location.state;
  const [tSummary, setTSummary] = useState<Transaction[]>();
  const [loading, setLoading] = useState(true);
  
  async function fetchSummary() {
    try {
      const obj = { email: email };
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/agent/sacco/failed`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      if (res.ok) {
        const data: Transaction[] = await res.json();
        console.log(
          data,
          "data",
          data[0].createdAt.replace("T", " ").split(".")[0]
        );
        setTSummary(data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSummary();
  }, []);
  return (
    <div>
      <p className="text-2xl font-bold tracking-tight">
        Summary of {name}{" "}
        <span className="font-semibold text-gray-500">({email})</span>
      </p>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-32">
          <Loader className="h-8 w-8 animate-spin" />
          <p>Loading Summary...</p>
        </div>
      ) : (
        <div>
          <div className="grid shadow-md px-3 overflow-x-auto bg-blue-500  mt-5 grid-cols-5 mb-2 md:grid-cols-7 gap-2 md:gap-4">
            <h3 className="text-white text-lg md:text-xl font-semibold tracking-wide">
              Plate Number
            </h3>
            <h3 className="text-white text-md text-center md:text-lg font-semibold tracking-wide">
              Amount (KES)
            </h3>
            <h3 className="text-white text-md text-center md:text-lg font-semibold tracking-wide hidden md:block">
              Creation Date
            </h3>
            <h3 className="text-white text-md text-center md:text-lg font-semibold tracking-wide">
              Transaction Type
            </h3>
            <h3 className="text-white text-md text-center md:text-lg font-semibold tracking-wide">
              Status
            </h3>
            <h3 className="text-white text-md text-center md:text-lg font-semibold tracking-wide hidden md:block">
              Narrative
            </h3>
            <h3 className="text-white text-md text-center md:text-lg font-semibold tracking-wide">
              Updated at
            </h3>
          </div>
          {tSummary?.map((transaction, index) => (
            <div>
              <div
                key={index}
                className="grid px-3 overflow-x-auto  mt-5 grid-cols-5 mb-2 md:grid-cols-7 gap-2 md:gap-4"
              >
                <p>{transaction.number_plate}</p>
                <p>
                  {(
                    Number(transaction.amount.$numberDecimal) * 10000
                  ).toLocaleString()}
                </p>
                <p className="hidden md:block">
                  {transaction.createdAt.replace("T", " ").split(".")[0]}
                </p>
                <p>{transaction.trans_type}</p>
                <p>{transaction.status}</p>
                <p className="hidden md:block">{transaction.narrative}</p>
                <p>{transaction.updatedAt.replace("T", " ").split(".")[0]}</p>
              </div>

              <hr className="border-gray-500 mt-1" />
            </div>
          ))}
          <Link to='/govt-dashboard'>
          <button className="bg-blue-500 text-white mt-8 w-40 py-3 rounded-md shadow-xl hover:bg-blue-600 hover:scale-105 transition-all duration-300" >Go back</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default GovtSummary;

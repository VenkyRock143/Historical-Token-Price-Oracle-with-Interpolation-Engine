type Result = {
  price: number;
  source: string;
};

export default function ResultCard({ result }: { result: Result }) {
  return (
    <div className="mt-4 bg-gray-100 p-4 rounded">
      <p><b>Price:</b> {result.price}</p>
      <p><b>Source:</b> {result.source}</p>
    </div>
  );
}

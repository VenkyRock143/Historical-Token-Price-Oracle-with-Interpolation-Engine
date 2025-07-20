import PriceForm from '../components/PriceForm';
import ResultCard from '../components/ResultCard';
import { usePriceStore } from '../store/usePriceStore';

export default function Home() {
  const { result } = usePriceStore() as { result: any };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Historical Token Price Oracle</h1>
      <PriceForm />
      {result && <ResultCard result={result} />}
    </main>
  );
}
import { usePayQuery } from "../../state-management/api/payment-api";

export const Payment = ({ id }: { id: string }) => {
  const { data } = usePayQuery(id);

  const khalti = async () => {
    window.location.href = data.url;
  };
  return (
    <>
      <button
        type="submit"
        className="rounded-md bg-brand px-3 py-2 text-sm text-other-white-100 font-semibold hover:animate-glow"
        onClick={khalti}
      >
        Pay
      </button>
    </>
  );
};

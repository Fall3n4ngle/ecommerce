import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/Button";
import { useTransition } from "react";
import { checkout } from "@/lib/actions/checkout";
import { useToast } from "@/lib/hooks/useToast";
import { Loader2 } from "lucide-react";

export default function CartSummary() {
  const { cartCount, totalPrice, cartDetails, redirectToCheckout } =
    useShoppingCart();
    
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  const shipmentAmount = cartCount! > 0 ? 500 : 0;
  const totalAmount = totalPrice! + shipmentAmount;

  const handleCheckout = () =>
    startTransition(async () => {
      if (!cartDetails) return;

      const session = await checkout(cartDetails);
      const result = await redirectToCheckout(session.id);

      if (result.error) {
        toast({
          title: "An error occured",
          description: "Error redirecting to checkout",
          variant: "destructive",
        });
      }
    });

  const disabled = pending || !cartDetails;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold">Shipment:</span>
        <span>
          {formatCurrencyString({
            value: shipmentAmount,
            currency: "USD",
          })}
        </span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-semibold">Total:</span>
        <span>
          {formatCurrencyString({
            value: totalAmount,
            currency: "USD",
          })}
        </span>
      </div>
      <Button
        className="block w-full"
        disabled={disabled}
        onClick={handleCheckout}
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin mx-auto" />
        ) : (
          "Continue to checkout"
        )}
      </Button>
    </div>
  );
}

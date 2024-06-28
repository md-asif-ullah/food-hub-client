import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateOrderStatusMutation } from "@/redux/services/OrderService";

interface orderProps {
  status: string;
  id: string;
}

function UpdateOrderStatus({ status, id }: orderProps) {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const { toast } = useToast();

  const handleStatus = async (status: string) => {
    try {
      const res = await updateOrderStatus({ id: id, status: status }).unwrap();

      if (res.success) {
        toast({
          title: "order updated successfully.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "order update failed.",
        description: error.message,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="border-0 bg-[#f58220] hover:bg-orange-700"
        >
          {status}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleStatus("accepted")}>
          Accepted
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatus("completed")}>
          Completed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatus("cancelled")}>
          Cancelled
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UpdateOrderStatus;

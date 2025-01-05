// Components Import
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

// Store Import
import { useFileStore } from "@/store/useFileStore";

export default function DeleteDialog(props) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { deletefile } = useFileStore();

  const handleDelete = () => {
    deletefile(props.id);
    setDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Trash2
          className="text-red-600 cursor-pointer hover:text-red-800 mr-5"
          size={24}
          onClick={() => setDialogOpen(true)}
        />
      </DialogTrigger>

      <DialogContent className="bg-white rounded-md shadow-lg text-center p-6">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete this file? This action cannot be
          undone.
        </p>
        <DialogFooter className="mt-4 flex justify-center gap-4">
          <Button variant="secondary" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

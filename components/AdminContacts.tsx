"use client";

import { useEffect, useState } from "react";
import { contactApi, ContactSubmission } from "@/lib/api/contactApi";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export default function ContactsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<number | null>(
    null
  );
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await contactApi.getAllContacts();
        setSubmissions(data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to load contact submissions");
        toast.error("Failed to load contact submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async () => {
    if (submissionToDelete === null) return;

    try {
      setDeleting(true);
      await contactApi.deleteContact(submissionToDelete);

      // Remove from state
      setSubmissions((prev) =>
        prev.filter((submission) => submission.id !== submissionToDelete)
      );

      // Show success toast
      toast.success("Contact submission deleted successfully");

      // Close dialog
      setDeleteDialogOpen(false);
      setSubmissionToDelete(null);
    } catch (err) {
      console.error("Error deleting contact:", err);
      toast.error("Failed to delete contact submission");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Contact Submissions</h1>

      {loading && (
        <div className="text-center py-8">
          <p>Loading submissions...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8 text-red-600">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && submissions.length > 0 && (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">
                    {submission.full_name}
                  </TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.title}</TableCell>
                  <TableCell className="max-w-md">
                    <div className="whitespace-pre-wrap wrap-break-word">
                      {submission.message}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(submission.created_at), "PPp")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="icon-sm"
                      onClick={() => {
                        setSubmissionToDelete(submission.id);
                        setDeleteDialogOpen(true);
                      }}
                      disabled={deleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {!loading && !error && submissions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No contact submissions yet</p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this contact submission? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

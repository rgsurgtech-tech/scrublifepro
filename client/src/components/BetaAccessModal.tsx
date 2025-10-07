import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Loader2, Users } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const betaSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  whyGoodFit: z.string().min(10, "Please provide at least 10 characters"),
  userType: z.enum(["student", "surgical_tech"], {
    required_error: "Please select your role",
  }),
  expectedBenefit: z.string().min(10, "Please provide at least 10 characters"),
});

type BetaSignupForm = z.infer<typeof betaSignupSchema>;

interface BetaAccessModalProps {
  open: boolean;
  onAccessGranted: (email: string) => void;
}

export function BetaAccessModal({ open, onAccessGranted }: BetaAccessModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [betaStatus, setBetaStatus] = useState({ count: 0, spotsRemaining: 100, isFull: false });

  const form = useForm<BetaSignupForm>({
    resolver: zodResolver(betaSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      whyGoodFit: "",
      userType: undefined,
      expectedBenefit: "",
    },
  });

  useEffect(() => {
    if (open) {
      fetch("/api/beta/status")
        .then((res) => res.json())
        .then((data) => setBetaStatus(data))
        .catch(console.error);
    }
  }, [open]);

  const onSubmit = async (data: BetaSignupForm) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("/api/beta/signup", "POST", data);
      if (response.success) {
        onAccessGranted(data.email);
      }
    } catch (error: any) {
      form.setError("root", {
        message: error.message || "Failed to sign up for beta",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-beta-access">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Users className="h-6 w-6 text-cyan-400" />
            Join Scrub Life Pro Beta
          </DialogTitle>
          <DialogDescription className="text-base">
            <div className="flex items-center justify-between mt-2 p-3 rounded-lg bg-gradient-to-r from-cyan-950/40 to-purple-950/40 border border-cyan-500/30">
              <span className="text-cyan-100">Only 100 users will be allowed to test the app</span>
              <span className="font-semibold text-cyan-400" data-testid="text-spots-remaining">
                {betaStatus.spotsRemaining} spots remaining
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        data-testid="input-beta-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                        data-testid="input-beta-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="whyGoodFit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why are you a good fit to test the app?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why you'd be a great beta tester..."
                      {...field}
                      data-testid="input-beta-why-fit"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Are you a student or current Surgical Tech?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="student" id="student" data-testid="radio-student" />
                        <label htmlFor="student" className="text-sm cursor-pointer">
                          Student
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="surgical_tech" id="surgical_tech" data-testid="radio-surgical-tech" />
                        <label htmlFor="surgical_tech" className="text-sm cursor-pointer">
                          Current Surgical Tech
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedBenefit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How do you think you can benefit from the app?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe how Scrub Life Pro will help you..."
                      {...field}
                      data-testid="input-beta-benefit"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || betaStatus.isFull}
              data-testid="button-beta-submit"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : betaStatus.isFull ? (
                "Beta Testing Full"
              ) : (
                "Request Beta Access"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

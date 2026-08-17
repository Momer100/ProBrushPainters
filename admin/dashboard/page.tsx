import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function DashboardPage() {
  const [step, setStep] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [stripeConnected, setStripeConnected] = useState(false);

  const handleConnectStripe = () => {
    // Simulate Stripe connection
    setStripeConnected(true);
    setStep(2);
  };

  const handleSaveWebsite = () => {
    // Simulate website save
    setStep(3);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to GatePost Admin</h1>
      
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Onboarding</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Let's get started with your 3-step setup:</p>
            <Button onClick={handleConnectStripe}>Connect Stripe Account</Button>
          </CardContent>
        </Card>
      )}
      
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Website</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input
                id="websiteUrl"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="e.g., my-yoga-studio.squarespace.com"
              />
            </div>
            <Button className="mt-4" onClick={handleSaveWebsite}>
              Save Website
            </Button>
          </CardContent>
        </Card>
      )}
      
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Get Your Script</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Paste this script into your website's header:</p>
            <pre className="bg-gray-100 p-2 rounded overflow-auto">
              {`<!-- GatePost Script -->
<script src="https://gatepost.example.com/script.js"></script>`}
            </pre>
            <Button className="mt-4" onClick={() => setStep(1)}>
              Back to Onboarding
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
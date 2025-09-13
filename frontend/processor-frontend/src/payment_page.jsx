import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';

const PaymentInterface = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <CardTitle className="text-xl font-semibold">
                {step === 1 ? "Payment Details" : "Payment Successful"}
              </CardTitle>
            </div>
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
          
          {step === 1 && (
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <span className="font-medium">Total Amount:</span>
              <span className="text-2xl font-bold text-gray-900">$49.99</span>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="card" className="text-sm font-medium">Card Information</Label>
                <div className="relative">
                  <Input 
                    id="card"
                    placeholder="1234 1234 1234 1234"
                    className="pl-4 pr-10 py-2 bg-white"
                  />
                  <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="text-sm font-medium">Expiry Date</Label>
                  <Input 
                    id="expiry"
                    placeholder="MM/YY"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc" className="text-sm font-medium">CVC</Label>
                  <Input 
                    id="cvc"
                    placeholder="123"
                    className="bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Cardholder Name</Label>
                <Input 
                  id="name"
                  placeholder="John Smith"
                  className="bg-white"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Pay "
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-500 mb-6">Thank you for your purchase</p>
              <Button 
                onClick={() => setStep(1)} 
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6"
              >
                Make Another Payment
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t border-gray-100">
          <div className="w-full flex items-center justify-center space-x-4 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            <span>Secured by AntPay</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentInterface;

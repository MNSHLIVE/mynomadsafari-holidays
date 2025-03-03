
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactFieldsProps {
  name: string;
  email: string;
  phone: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
}

export const ContactFields = ({
  name,
  email,
  phone,
  setName,
  setEmail,
  setPhone
}: ContactFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="name" className="mb-1.5">
          Full Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="email" className="mb-1.5">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone" className="mb-1.5">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            placeholder="Your contact number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>
    </>
  );
};

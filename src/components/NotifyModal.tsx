"use client";

import { useState } from "react";
import { X, CheckCircle2, ArrowRight, ShieldCheck, Mail, Loader2, AlertCircle } from "lucide-react";

interface NotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotifyModal({ isOpen, onClose }: NotifyModalProps) {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [role, setRole] = useState("Founder / Executive");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, city, role }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail("");
    setErrorMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 rounded-2xl glass-card border border-[#c9982a]/40 shadow-2xl text-left bg-[#0f1117]/95">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-1.5 text-[#9496a1] hover:text-[#f8f7f4] hover:bg-[#c9982a]/10 rounded-full transition-colors disabled:opacity-50"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#3a8a3a] animate-pulse-green" />
              <h3 className="text-lg font-bold text-[#f8f7f4]">
                Request Private Invitation
              </h3>
            </div>
            <p className="text-xs text-[#9496a1] mb-6 leading-relaxed">
              No public signups. Sessions are strictly curated by city and domain expertise. Leave your details for an early room invite.
            </p>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#e0c870] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-[#9496a1]" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    disabled={loading}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm glass-input focus:border-[#c9982a] disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#e0c870] mb-1.5">
                  Primary City
                </label>
                <select
                  value={city}
                  disabled={loading}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm glass-input focus:border-[#c9982a] bg-[#0f1117] text-[#f8f7f4] disabled:opacity-50"
                >
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Other">Other City in India</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#e0c870] mb-1.5">
                  Your Role / Practitioner Profile
                </label>
                <select
                  value={role}
                  disabled={loading}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm glass-input focus:border-[#c9982a] bg-[#0f1117] text-[#f8f7f4] disabled:opacity-50"
                >
                  <option value="Founder / Executive">Founder / C-Suite Executive</option>
                  <option value="Investor / VC / Angel">Investor / VC / Angel</option>
                  <option value="Senior Practitioner / Leader">Senior Practitioner / VP</option>
                  <option value="Operator / Product Leader">Operator / Product Leader</option>
                  <option value="Other">Other Professional</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-[#c9982a] text-[#0f1117] font-bold text-sm hover:bg-[#e0c870] transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,152,42,0.35)] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...
                    </>
                  ) : (
                    <>
                      Submit Invitation Request <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#9496a1] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3a8a3a]" />
                Zero spam. No sales pitches or promotional emails.
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#3a8a3a]/20 text-[#3a8a3a] flex items-center justify-center mx-auto border border-[#3a8a3a]/40">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#f8f7f4]">
              Invitation Requested
            </h3>
            <p className="text-xs text-[#9496a1] leading-relaxed max-w-xs mx-auto">
              We&apos;ve logged your profile for <span className="text-[#e0c870] font-semibold">{city}</span>. As soon as the room is ready in your city for <span className="text-[#e0c870] font-semibold">{role}</span>, we&apos;ll be in touch directly.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 rounded-xl bg-[#c9982a]/20 text-[#e0c870] font-medium text-xs border border-[#c9982a]/40 hover:bg-[#c9982a]/30 transition-all"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

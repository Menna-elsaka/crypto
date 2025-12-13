import React from "react";
import { motion } from "motion/react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface VigenereExplanationProps {
  onNavigate: (page: string) => void;
}

export function VigenereCipherExplanation({ onNavigate }: VigenereExplanationProps) {
  return (
    <motion.div className="min-h-screen pt-24 pb-16 px-6 theme-transition theme-bg">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8">
          <Button
            onClick={() => onNavigate("cryptanalysis")}
            variant="outline"
            className="mb-0 theme-card theme-transition"
            style={{
              borderColor: "var(--theme-card-border)",
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cryptanalysis
          </Button>
        </div>

        <Card className="theme-card p-6">
          <h1 className="theme-accent text-2xl sm:text-3xl mb-6">Vigenere Cipher Cryptanalysis</h1>

          <div className="space-y-4 theme-text-secondary">
            <section>
              <h2 className="theme-accent mb-2 font-semibold">Introduction</h2>
              <p>
                The Vigenere Cipher cryptanalysis method shown here is a ciphertext-only attack. The user
                provides the ciphertext and the assumed key length. The system then performs frequency analysis
                on each column of the ciphertext to recover the key and decrypt the message.
              </p>
            </section>

            <section>
              <h2 className="theme-accent mb-2 font-semibold">How the Vigenere Cipher Works</h2>
              <p>
                The cipher encrypts each plaintext letter using a repeated key. Each key letter determines a Caesar
                shift applied to the corresponding plaintext letter. After the key ends, it repeats.
              </p>
            </section>

            <section>
              <h2 className="theme-accent mb-2 font-semibold">Encryption Formula:</h2>
              <p>
                <code className="font-mono">C(i) = (P(i) + K(i)) mod 26</code>
              </p>
            </section>

            <section>
              <h2 className="theme-accent mb-2 font-semibold">Decryption Formula:</h2>
              <p>
                <code className="font-mono">P(i) = (C(i) - K(i)) mod 26</code>
              </p>
            </section>

            <section>
              <h2 className="theme-accent mb-2 font-semibold">Idea of Cryptanalysis</h2>
              <p>
                Because the key repeats, the ciphertext can be separated into several Caesar ciphers. If the key
                length is L, then every L-th character belongs to the same Caesar shift. Frequency analysis can
                then be applied to each group of letters.
              </p>
            </section>

            <section>
              <h2 className="theme-accent mb-2 font-semibold">Attack Steps:</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li><strong>Step 1:</strong> Provide Key Length — assume a key length L and split the ciphertext into L groups.</li>
                <li><strong>Step 2:</strong> Build Columns — collect every L-th character for each key position.</li>
                <li><strong>Step 3:</strong> Frequency Analysis — count frequencies in each column and assume most frequent ciphertext letter corresponds to 'E'.</li>
                <li><strong>Step 4:</strong> Recover Key — estimate K(j) = (X - E) mod 26 for each column.</li>
                <li><strong>Step 5:</strong> Decrypt — combine the estimated key letters and decrypt the full ciphertext.</li>
              </ol>
            </section>

            <section>
              <h2 className="theme-accent mb-2 font-semibold">Why This Works</h2>
              <p>
                The attack works because natural languages have predictable frequency patterns and because the key repeats.
              </p>
            </section>

            <section>
              <h2 className="theme-accent mb-2 font-semibold">Purpose of This Module</h2>
              <p>
                This module demonstrates how classical polyalphabetic ciphers can be broken and why modern
                cryptography requires non-repeating, stronger key structures.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

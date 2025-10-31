import { ArrowRight, Key, Lock, Shield } from 'lucide-react'
import React from 'react'
import CardHome from '../../components/CardHome/CardHome'
import {motion} from 'framer-motion'

export default function Home() {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.3 } },
        }}
        className="bg-[#11113e] min-h-screen"
      >
        <div className="container">
          <div className="flex pt-64 justify-center flex-col gap-8 items-center">
            <motion.h1
              className="purple-text text-purple-400 tracking-widest text-6xl font-semibold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.05, textShadow: "0 0 20px rgba(147, 51, 234, 0.8)" }}
            >
              CRYPTOGRAPHY
            </motion.h1>
            <motion.h2
              className="letter-spacing text-md text-purple-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              BLAKE2b
            </motion.h2>
            <motion.p
              className="text-center text-md text-purple-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Discover the world of encryption and secure communication. Explore<br /> algorithms that protect digital information in our modern age.
            </motion.p>
            <motion.button
              className="px-6 py-3 cursor-pointer purple-shadow rounded-xl bg-linear-to-r from-purple-500 to-blue-500 transition-all duration-300 shadow-md hover:shadow-2xl text-white font-medium flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              whileHover={{ scale: 1.1, boxShadow: "0 15px 40px rgba(147, 51, 234, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started <ArrowRight />
            </motion.button>
          </div>

          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 pt-64 pb-14 items-center gap-9">
              <CardHome
                icon={<Shield size={"40px"} className="text-purple-400" />}
                title={"Security"}
                desc={"Learn about robust security measures to protect your data."}
              />
              <CardHome
                icon={<Lock size={"40px"} className="text-purple-400" />}
                title={"Encryption"}
                desc={"Explore advanced encryption techniques for privacy."}
              />
              <CardHome
                icon={<Key size={"40px"} className="text-purple-400" />}
                title={"Authentication"}
                desc={"Understand authentication methods for secure access."}
              />
            </div>
          </motion.div>

          <motion.div
            className="p-7 mx-28 text-center shadow-[0_1px_5px_rgba(191,132,250,0.5)] border rounded-lg h-[200px] bg-[#251d4f] cursor-pointer border-[#4c2b83] hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(191,132,250,0.6)" }}
          >
            <motion.h2
              className="text-purple-400 text-center text-2xl font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.7 }}
            >
              What is Cryptography?
            </motion.h2>
            <motion.p
              className="text-purple-200 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.9 }}
            >
              Cryptography is the science of securing communication and data through codes and ciphers, ensuring confidentiality, integrity, and authenticity in the digital world.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

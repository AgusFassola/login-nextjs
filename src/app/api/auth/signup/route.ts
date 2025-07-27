import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, password, fullname } = await request.json();

if(!password || password.length < 6){
    return NextResponse.json({message:"Password must be at least 6 characters long"}, {status: 400});
  }

  try{
    await connectDB();
    const userExists = await User.findOne({ email });
    if (userExists) return NextResponse.json({message:"User already exists"}, {status: 409});

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, fullname, password: hashedPassword  });
    if (!user) return NextResponse.json({message:"User creation failed"}, {status: 500});
    const userSaved= await user.save();
    console.log("User created successfully:", userSaved);

    return NextResponse.json({message: "User created successfully", user: userSaved }, {status: 201});

  }catch(err) {
    console.error("Error creating user:", err);
    return NextResponse.json({message:"Internal server error"}, {status: 480});
  }
}

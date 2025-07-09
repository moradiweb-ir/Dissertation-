import { Button } from "antd";
import Link from "next/link";
import React from "react";

function Homepage() {
  return (
    <div className="flex justify-center items-center flex-col-reverse">
      <div className="px-10 flex flex-col gap-7 justify-center">
        <h1 className="text-4xl font-bold text-primary">
          خوش آمدید به رزرو آنلاین دکتر
        </h1>
        <p className="text-xl w-[500px] h-24 min-md: w-[350px] text-center ">
          ما بهترین خدمات پزشکی را برای همه بیماران خود ارائه می‌دهیم. ما بهترین
          پزشکان و پرستاران را برای مراقبت از شما داریم. ما 24 ساعته و 7 روز
          هفته برای مراقبت از شما باز هستیم. ما اینجا هستیم تا به شما خدمت کنیم.
        </p>
        <div className="flex gap-5 flex-wrap mt-10 max-md:mt-24 justify-center ">
          <Button>
            <Link href="/appointment-confirmation"> دانلود نوبت</Link>
          </Button>
          <Button type="primary">
            <Link href="/book-appointment">نوب دهی</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <img src="./logo.jpg" className="h-[250px]" />
      </div>
    </div>
  );
}

export default Homepage;

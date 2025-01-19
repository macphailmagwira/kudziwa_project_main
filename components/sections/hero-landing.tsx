import Link from "next/link";

import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";
import { cn, nFormatter } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export default async function HeroLanding() {
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/mickasmt/next-saas-stripe-starter",
    {
      ...(env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      // data will revalidate every hour
      next: { revalidate: 3600 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
      <Link
  href="#"
  className={cn(
    buttonVariants({ variant: "outline", size: "sm", rounded: "full" }),
    "px-4",
  )}
  target="_blank"
>
  <span className="mr-3">🎉</span>
  <span className="text-sm">Startups with 5 to 50 customers can start for free!&nbsp;</span>
</Link>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
        Turn Customer Insights into Success Stories{" "}
          <span className="text-gradient_indigo-purple font-extrabold">
          Effortlessly.
          </span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
        We help you keep and upsell your users, make them happy and automate customer success workflows all at a fraction of the cost
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="https://6khir3cmu2f.typeform.com/to/YQa7oLD7"
            prefetch={true}
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "gap-2",
            )}
          >
            <span>Join our Waitlist</span>
            <Icons.arrowRight className="size-4" />
          </Link>
          {/*<Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
                rounded: "full",
              }),
              "px-5",
            )}
          >
            <Icons.gitHub className="mr-2 size-4" />
            <p>
              <span className="hidden sm:inline-block">Star on</span> GitHub{" "}
              <span className="font-semibold">{nFormatter(stars)}</span>
            </p>
          </Link>*/}
        </div>
      </div>
    </section>
  );
}

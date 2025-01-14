"use client";

import { usePathname } from "next/navigation";
import ZeroLink from "../../Atoms/Link/ZeroLink";
import Label from "../../Atoms/Label/Label";
import { useTranslation } from "next-i18next";
import { ChevronRight } from "lucide-react";
import { AllPath } from "@/shared/constants/application-path";
import { Fragment } from "react";

const Breadcrumbs = () => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const breadcrumbRoutes = (() => {
    const breadcrumbs = pathname.split("/").filter((path) => path);
    const routes = ["/"];
    for (let i = 1; i <= breadcrumbs.length; i++) {
      routes.push((routes[i - 1] == "/" ? routes[i - 1] : routes[i - 1] + "/") + breadcrumbs[i - 1]);
    }
    return Object.values(AllPath).filter((route) => {
      if (route.path.includes(":id")) {
        const routePattern = route.path.replace(":id", "[^/]+");
        const regex = new RegExp(`^${routePattern}$`);
        return routes.some((r) => regex.test(r));
      }
      return routes.includes(route.path);
    });
  })();

  return (
    <div className="flex flex-row gap-2">
      {breadcrumbRoutes.map((breadcrumb, index) => (
        <Fragment key={index}>
          {index === breadcrumbRoutes.length - 1 ? (
            <Label text={breadcrumb.name} t={t} translate={true} inheritedClass className="font-bold text-black" />
          ) : (
            <>
              <ZeroLink key={index} href={breadcrumb.path}>
                <Label
                  text={breadcrumb.name}
                  t={t}
                  translate={true}
                  inheritedClass
                  className="font-bold cursor-pointer"
                />
              </ZeroLink>
              <ChevronRight size={20} className="text-primary" />
            </>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;

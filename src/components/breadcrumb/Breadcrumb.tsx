import { Breadcrumb, BreadcrumbItemProps, Typography } from "antd";
import Link from "antd/es/typography/Link";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { string } from "zod";

const DynamicBreadcrumb: React.FC = () => {
  const location = useLocation();
  const { Text } = Typography;
  type TBreadcrumb = { title: JSX.Element | string };
  const [breadcrumbs, setBreadcrumbs] = useState<TBreadcrumb[]>([]);

  const generateBreadcrumbs = () => {
    const crumbs: TBreadcrumb[] = [];

    const routes = location.pathname.split("/");
    routes.forEach((route, index) => {
      const path = routes.slice(0, index + 1).join("/");

      if (index > 0 && index !== routes.length - 1) {
        crumbs.push({
          title: <a href={path}>{route.toUpperCase()}</a>,
        });
      } else if (index === routes.length - 1) {
        crumbs.push({
          title: (
            <Text style={{ color: "#0C377C", fontWeight: "bold" }}>
              {route.toUpperCase()}
            </Text>
          ),
        });
      }
    });

    setBreadcrumbs(crumbs);
  };

  useEffect(() => {
    generateBreadcrumbs();
  }, [location]);

  return <Breadcrumb items={breadcrumbs} separator={">"} />;
};

export default DynamicBreadcrumb;

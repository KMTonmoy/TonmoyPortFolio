 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import Link from "next/link";

export const AdminPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Admin Panel
        </CardTitle>
        <CardDescription>Administrative tools and settings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button asChild variant="outline" className="justify-start">
            <Link href="/dashboard/manage-users">Manage Users</Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href="/dashboard/manage-projects">Manage Projects</Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href="/dashboard/manage-blogs">Manage Blogs</Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href="/dashboard/customize-skills">Manage Skills</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
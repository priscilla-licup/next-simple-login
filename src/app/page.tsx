// import { Button } from "@/components/ui/button";

// export default function Home() {
//   return (
//     <main className="container mx-auto py-6">
//       <Button href="">Our Cool Button</Button>
//     </main>
//   );
// }

import { redirect } from 'next/navigation';
export default async function Home({ }) {
    redirect('/signin');
  // ...
}
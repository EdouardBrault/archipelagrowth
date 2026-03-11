
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const MasterclassCta = () => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-gray-900 text-lg font-bold flex items-center">
          🚀 Formation GEO Gratuite
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          Découvrez comment être premier sur ChatGPT et Perplexity
        </p>
        <Button 
          asChild 
          className="w-full bg-archipel-cyan text-archipel-dark hover:bg-archipel-cyan/90 font-semibold"
        >
          <Link to="/masterclass">Réserver ma place</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default MasterclassCta;

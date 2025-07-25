import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Card from "@/components/ui/Card";
import LoginForm from "@/components/auth/LoginForm";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">AB</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Giriş Yap
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Atakum Bileşim Derneği hesabınızla devam edin
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8">
          <div className="space-y-6">
            {/* Social Login Buttons */}
            <SocialLoginButtons />

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">veya</span>
              </div>
            </div>

            {/* Email Login Form */}
            <LoginForm />

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Hesabınız yok mu?{' '}
                <a
                  href="/auth/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Kayıt Ol
                </a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics
from .models import SiteConfig, HeroSlide, DiagnosticQuizQuestion, TrustPillar
from .serializers import (
    SiteConfigSerializer,
    HeroSlideSerializer,
    DiagnosticQuizQuestionSerializer,
    TrustPillarSerializer
)

class SiteConfigView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        config = SiteConfig.get_solo()
        serializer = SiteConfigSerializer(config)
        return Response(serializer.data)

    def put(self, request):
        config = SiteConfig.get_solo()
        serializer = SiteConfigSerializer(config, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        return self.put(request)


# 1. Hero Slides CRUD
class HeroSlideListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = HeroSlideSerializer
    pagination_class = None

    def get_queryset(self):
        # Admin can view all slides; if ?all=true, return inactive too
        all_param = self.request.query_params.get('all')
        if all_param == 'true':
            return HeroSlide.objects.all().order_by('order', 'id')
        return HeroSlide.objects.filter(is_active=True).order_by('order', 'id')


class HeroSlideDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = HeroSlideSerializer
    queryset = HeroSlide.objects.all()


# 2. Diagnostic Quiz CRUD
class DiagnosticQuizListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = DiagnosticQuizQuestionSerializer
    pagination_class = None

    def get_queryset(self):
        all_param = self.request.query_params.get('all')
        if all_param == 'true':
            return DiagnosticQuizQuestion.objects.all().order_by('order', 'step_number')
        return DiagnosticQuizQuestion.objects.filter(is_active=True).order_by('order', 'step_number')


class DiagnosticQuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = DiagnosticQuizQuestionSerializer
    queryset = DiagnosticQuizQuestion.objects.all()


# 3. Trust Pillars CRUD
class TrustPillarListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TrustPillarSerializer
    pagination_class = None

    def get_queryset(self):
        all_param = self.request.query_params.get('all')
        if all_param == 'true':
            return TrustPillar.objects.all().order_by('order')
        return TrustPillar.objects.filter(is_active=True).order_by('order')


class TrustPillarDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TrustPillarSerializer
    queryset = TrustPillar.objects.all()

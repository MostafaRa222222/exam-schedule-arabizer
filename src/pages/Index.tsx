
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, Palette, Type, Sparkles, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

interface Subject {
  id: string;
  name: string;
  year: number;
  semester: number;
  examTime: string;
  examDate: string;
}

const SUBTITLE = "برنامج الامتحان النظري - الفصل الثاني للعام الدراسي 2024/2025"

const loadSubjectsFromCSV = async (): Promise<Subject[]> => {
  try {
    const response = await fetch('/subjects.csv');
    const csvText = await response.text();
    const lines = csvText.trim().split('\n');
    
    return lines.slice(1).map((line, index) => {
      const values = line.split(',');
      const subject: Subject = {
        id: `${values[1]}-${values[2]}-${index + 1}`,
        name: values[0],
        year: parseInt(values[1]),
        semester: parseInt(values[2]),
        examTime: values[3],
        examDate: values[4]
      };
      return subject;
    });
  } catch (error) {
    console.error('Error loading subjects from CSV:', error);
    return [];
  }
};

let subjects: Subject[] = [];

const Index = () => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const loadedSubjects = await loadSubjectsFromCSV();
      subjects = loadedSubjects;
      setIsLoading(false);
    };
    loadData();
  }, []);
  const [tableFormat, setTableFormat] = useState<string>('subject-date-time');
  const [textFormat, setTextFormat] = useState<string>('regular');
  const [tableColor, setTableColor] = useState<string>('bluebits');
  const [includeMotivation, setIncludeMotivation] = useState<boolean>(false);

  const colorMap = {
    bluebits: '#414297',
    purple: '#8B5CF6',
    black: '#1F2937',
    pink: '#EC4899',
    blue: '#3B82F6',
    green: '#10B981',
    red: '#EF4444',
    orange: '#F97316',
    teal: '#14B8A6',
    indigo: '#6366F1',
    amber: '#F59E0B',
    emerald: '#059669',
    cyan: '#06B6D4'
  };

  const fontWeightMap = {
    extralight: '200',
    light: '300',
    regular: '400',
    semibold: '600',
    bold: '700'
  };

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleSelectAllSemester = (year: number, semester: number) => {
    const semesterSubjects = subjects
      .filter(s => s.year === year && s.semester === semester)
      .map(s => s.id);
    
    const allSelected = semesterSubjects.every(id => selectedSubjects.includes(id));
    
    if (allSelected) {
      setSelectedSubjects(prev => prev.filter(id => !semesterSubjects.includes(id)));
    } else {
      setSelectedSubjects(prev => [...new Set([...prev, ...semesterSubjects])]);
    }
  };

  const getSubjectsBySemester = (year: number, semester: number) => {
    return subjects.filter(s => s.year === year && s.semester === semester);
  };

  const generateTable = () => {
    const selectedSubjectData = subjects.filter(s => selectedSubjects.includes(s.id));
    
    if (selectedSubjectData.length === 0) {
      alert('يرجى اختيار مادة واحدة على الأقل');
      return;
    }

    // Create a new window for the table
    const newWindow = window.open('', '_blank');
    if (!newWindow) return;

    const tableHtml = createTableHTML(selectedSubjectData, false);
    newWindow.document.documentElement.innerHTML = tableHtml;
  };

  const downloadAsJPG = () => {
    const selectedSubjectData = subjects.filter(s => selectedSubjects.includes(s.id));
    
    if (selectedSubjectData.length === 0) {
      alert('يرجى اختيار مادة واحدة على الأقل');
      return;
    }

    // Create a temporary div to render the table for image conversion
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = createTableHTML(selectedSubjectData, true);
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.background = 'white';
    tempDiv.style.width = '1000px';
    document.body.appendChild(tempDiv);

    // Convert to canvas and download as JPG
    html2canvas(tempDiv, {
      backgroundColor: 'white',
      scale: 3,
      useCORS: true,
      width: 1000,
      height: tempDiv.scrollHeight,
      scrollX: 0,
      scrollY: 0
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'exam-schedule.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
      document.body.removeChild(tempDiv);
    }).catch(error => {
      console.error('Error generating image:', error);
      document.body.removeChild(tempDiv);
    });
  };

  const createTableHTML = (selectedSubjectData: Subject[], isForImage: boolean = false) => {
    const motivationalQuotes = [
      'بالتوفيق في امتحاناتك! 🌟',
      'النجاح ثمرة الجهد والمثابرة 💪',
      'اجتهد اليوم لتحصد النجاح غداً 🎓',
      'كل خطوة تخطوها تقربك من هدفك 🚀',
      'الثقة بالنفس أول خطوات النجاح ✨',
      'لا تستسلم أبداً، فالنجاح قريب 🌈',
      'العلم نور والجهل ظلام 📚',
      'من جد وجد ومن زرع حصد 🌱',
      'الطموح لا يعرف المستحيل 🎯',
      'اليوم تعب وغداً نجاح 💎',
      'ابذل جهدك وتوكل على الله 🤲',
      'كل امتحان فرصة لتثبت قدراتك 🏆',
      'الإصرار والعزيمة مفتاح النجاح 🗝️',
      'أحلامك تنتظرك، فلا تخذلها 🌟',
      'التميز ليس صدفة بل نتيجة جهد 👑'
    ];

    const motivationPhrase = includeMotivation 
      ? motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
      : '';

    let tableContent = '';

    if (tableFormat === 'subject-date-time') {
      // Sort subjects by date and time
      const sortedSubjects = [...selectedSubjectData].sort((a, b) => {
        const dateA = new Date(a.examDate.split('/').reverse().join('-'));
        const dateB = new Date(b.examDate.split('/').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      });

      tableContent = `
        <table style="width: 100%; border-collapse: collapse; font-family: 'Cairo', Arial, sans-serif; font-weight: ${fontWeightMap[textFormat as keyof typeof fontWeightMap]}; border: 3px solid ${colorMap[tableColor as keyof typeof colorMap]};">
          <thead>
            <tr style="background: linear-gradient(135deg, ${colorMap[tableColor as keyof typeof colorMap]}, ${colorMap[tableColor as keyof typeof colorMap]}dd); color: white;">
              <th style="border: 2px solid white; padding: 15px; text-align: center; font-size: 18px; font-weight: 700;">المادة</th>
              <th style="border: 2px solid white; padding: 15px; text-align: center; font-size: 18px; font-weight: 700;">التاريخ</th>
              <th style="border: 2px solid white; padding: 15px; text-align: center; font-size: 18px; font-weight: 700;">الوقت</th>
            </tr>
          </thead>
          <tbody>
            ${sortedSubjects.map((subject, index) => `
              <tr style="background-color: ${index % 2 === 0 ? '#f8f9fa' : 'white'}; transition: all 0.3s ease;">
                <td style="border: 2px solid #ddd; padding: 15px; text-align: center; font-size: 16px;">${subject.name}</td>
                <td style="border: 2px solid #ddd; padding: 15px; text-align: center; font-size: 16px; color: ${colorMap[tableColor as keyof typeof colorMap]}; font-weight: 600;">${subject.examDate}</td>
                <td style="border: 2px solid #ddd; padding: 15px; text-align: center; font-size: 16px; font-weight: 500;">${subject.examTime}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else if (tableFormat === 'date-subjects-time') {
      // Group by date
      const groupedByDate: { [key: string]: Subject[] } = {};
      selectedSubjectData.forEach(subject => {
        if (!groupedByDate[subject.examDate]) {
          groupedByDate[subject.examDate] = [];
        }
        groupedByDate[subject.examDate].push(subject);
      });

      // Sort dates
      const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
        const dateA = new Date(a.split('/').reverse().join('-'));
        const dateB = new Date(b.split('/').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      });

      let tableRows = '';
      sortedDates.forEach((date, dateIndex) => {
        const dateSubjects = groupedByDate[date];
        dateSubjects.forEach((subject, subIndex) => {
          tableRows += `
            <tr style="background-color: ${dateIndex % 2 === 0 ? '#f8f9fa' : 'white'};">
              ${subIndex === 0 && !isForImage ? `<td style="border: 2px solid #ddd; padding: 15px; text-align: center; vertical-align: middle; font-size: 16px; color: ${colorMap[tableColor as keyof typeof colorMap]}; font-weight: 600;" rowspan="${dateSubjects.length}">${date}</td>` : ''}
              ${isForImage ? `<td style="border: 2px solid #ddd; padding: 15px; text-align: center; font-size: 16px; color: ${colorMap[tableColor as keyof typeof colorMap]}; font-weight: 600;">${date}</td>` : ''}
              <td style="border: 2px solid #ddd; padding: 15px; text-align: center; font-size: 16px;">${subject.name}</td>
              <td style="border: 2px solid #ddd; padding: 15px; text-align: center; font-size: 16px; font-weight: 500;">${subject.examTime}</td>
            </tr>
          `;
        });
      });

      tableContent = `
        <table style="width: 100%; border-collapse: collapse; font-family: 'Cairo', Arial, sans-serif; font-weight: ${fontWeightMap[textFormat as keyof typeof fontWeightMap]}; border: 3px solid ${colorMap[tableColor as keyof typeof colorMap]};">
          <thead>
            <tr style="background: linear-gradient(135deg, ${colorMap[tableColor as keyof typeof colorMap]}, ${colorMap[tableColor as keyof typeof colorMap]}dd); color: white;">
              <th style="border: 2px solid white; padding: 15px; text-align: center; font-size: 18px; font-weight: 700;">التاريخ</th>
              <th style="border: 2px solid white; padding: 15px; text-align: center; font-size: 18px; font-weight: 700;">المواد</th>
              <th style="border: 2px solid white; padding: 15px; text-align: center; font-size: 18px; font-weight: 700;">الوقت</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      `;
    } else {
      // Group by time
      const groupedByTime: { [key: string]: Subject[] } = {};
      selectedSubjectData.forEach(subject => {
        if (!groupedByTime[subject.examTime]) {
          groupedByTime[subject.examTime] = [];
        }
        groupedByTime[subject.examTime].push(subject);
      });

      tableContent = `
        <table style="width: 100%; border-collapse: collapse; font-family: 'Cairo', Arial, sans-serif; font-weight: ${fontWeightMap[textFormat as keyof typeof fontWeightMap]}; border: 3px solid ${colorMap[tableColor as keyof typeof colorMap]};">
          <thead>
            <tr style="background: linear-gradient(135deg, ${colorMap[tableColor as keyof typeof colorMap]}, ${colorMap[tableColor as keyof typeof colorMap]}dd); color: white;">
              <th style="border: 2px solid white; padding: 15px; text-align: center; font-size: 18px; font-weight: 700;">الوقت</th>
              <th style="border: 2px solid white; padding: 15px; text-align: center; font-size: 18px; font-weight: 700;">المواد والتواريخ</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(groupedByTime).map(([time, timeSubjects], index) => `
              <tr style="background-color: ${index % 2 === 0 ? '#f8f9fa' : 'white'};">
                <td style="border: 2px solid #ddd; padding: 15px; text-align: center; font-size: 16px; color: ${colorMap[tableColor as keyof typeof colorMap]}; font-weight: 600;">${time}</td>
                <td style="border: 2px solid #ddd; padding: 15px; text-align: center; font-size: 16px;">
                  ${timeSubjects.map(s => `${s.name} (${s.examDate})`).join('<br>')}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    return `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>جدول الامتحانات</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Cairo', Arial, sans-serif;
            margin: 0;
            padding: 30px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            direction: rtl;
            min-height: 100vh;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            position: relative;
            overflow: hidden;
          }
          .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, ${colorMap[tableColor as keyof typeof colorMap]}, ${colorMap[tableColor as keyof typeof colorMap]}aa);
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            position: relative;
          }
          .header h1 {
            color: ${colorMap[tableColor as keyof typeof colorMap]};
            margin-bottom: 15px;
            font-size: 3em;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          }
          .header p {
            color: #666;
            font-size: 1.3em;
            font-weight: 500;
          }
          .motivation {
            background: linear-gradient(135deg, ${colorMap[tableColor as keyof typeof colorMap]}, ${colorMap[tableColor as keyof typeof colorMap]}cc);
            color: white;
            padding: 20px;
            border-radius: 15px;
            margin: 30px 0;
            text-align: center;
            font-size: 1.4em;
            font-weight: 600;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          .note {
            background: linear-gradient(135deg, #fff3cd, #ffeaa7);
            border: 2px solid #ffd93d;
            padding: 20px;
            border-radius: 12px;
            margin: 30px 0;
            text-align: center;
            color: #856404;
            font-weight: 600;
          }
          ${!isForImage ? `
          .stats {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin: 30px 0;
            flex-wrap: wrap;
          }
          .stat-item {
            background: linear-gradient(135deg, ${colorMap[tableColor as keyof typeof colorMap]}15, ${colorMap[tableColor as keyof typeof colorMap]}25);
            padding: 15px 25px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid ${colorMap[tableColor as keyof typeof colorMap]}40;
          }
          .stat-number {
            font-size: 2em;
            font-weight: 700;
            color: ${colorMap[tableColor as keyof typeof colorMap]};
          }
          .stat-label {
            font-size: 1em;
            color: #666;
            font-weight: 500;
          }` : ''}
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📚 جدول الامتحانات</h1>
            <p style="color: #666; font-size: 1.1em; font-weight: 500; margin-bottom: 20px;">${SUBTITLE}</p>
            ${!isForImage ? `
            <div class="stats">
              <div class="stat-item">
                <div class="stat-number">${selectedSubjectData.length}</div>
                <div class="stat-label">المواد المختارة</div>
              </div>
            </div>` : ''}
          </div>
          ${motivationPhrase ? `<div class="motivation">${motivationPhrase}</div>` : ''}
          ${tableContent}
          <div class="note">
            <p><strong>📝 ملاحظة هامة:</strong> "م" يعني امتحان مؤتمت</p>
            <p><strong>⚠️ تنبيه:</strong> يُرجى التأكد من مواعيد الامتحان بعد الإنشاء</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">جارٍ تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8 sm:pt-4">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-16 w-auto sm:h-20 md:h-24 lg:h-28 object-contain drop-shadow-lg transition-all duration-300 hover:scale-105  "
            />
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-12 w-12 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">مولد جداول الامتحانات</h1>
          </div>
          <p className="text-sm sm:text-base text-blue-700 font-medium mb-2">${SUBTITLE}</p>
          <p className="text-lg sm:text-xl text-gray-600 px-4">أهلاً وسهلاً! اختر موادك واحصل على جدول امتحاناتك المخصص</p>
        </div>

        {/* Subject Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              اختيار المواد الدراسية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {[1, 2, 3, 4, 5].map(year => (
                <div key={year} className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-4 text-center text-blue-800">
                    السنة {year === 1 ? 'الأولى' : year === 2 ? 'الثانية' : year === 3 ? 'الثالثة' : year === 4 ? 'الرابعة' : 'الخامسة'}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {[1, 2].map(semester => {
                      const semesterSubjects = getSubjectsBySemester(year, semester);
                      const selectedInSemester = semesterSubjects.filter(s => selectedSubjects.includes(s.id)).length;
                      const allSelected = semesterSubjects.length > 0 && selectedInSemester === semesterSubjects.length;
                      
                      return (
                        <div key={semester} className="border rounded-lg p-3 bg-white">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-700">
                              الفصل {semester === 1 ? 'الأول' : 'الثاني'} ({semesterSubjects.length} مواد)
                            </h4>
                            <Button
                              variant={allSelected ? "destructive" : "default"}
                              size="sm"
                              onClick={() => handleSelectAllSemester(year, semester)}
                            >
                              {allSelected ? 'إلغاء الكل' : 'تحديد الكل'}
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-2">
                            {semesterSubjects.map(subject => (
                              <div key={subject.id} className="flex items-center space-x-2 space-x-reverse">
                                <Checkbox
                                  id={subject.id}
                                  checked={selectedSubjects.includes(subject.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked === true) {
                                      handleSubjectToggle(subject.id);
                                    } else if (checked === false) {
                                      handleSubjectToggle(subject.id);
                                    }
                                  }}
                                />
                                <Label htmlFor={subject.id} className="text-sm cursor-pointer flex-1">
                                  {subject.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                          
                          {selectedInSemester > 0 && (
                            <Badge variant="secondary" className="mt-2">
                              محدد: {selectedInSemester} من {semesterSubjects.length}
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
              <span className="text-lg font-semibold text-blue-800">
                إجمالي المواد المختارة: {selectedSubjects.length}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Table Format Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              تنسيق الجدول
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={tableFormat} onValueChange={setTableFormat} dir='rtl'>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="subject-date-time" id="subject-date-time" />
                <Label htmlFor="subject-date-time">مادة - تاريخ - وقت</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="date-subjects-time" id="date-subjects-time" />
                <Label htmlFor="date-subjects-time">تاريخ - مواد - وقت</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="time-subjects-dates" id="time-subjects-dates" />
                <Label htmlFor="time-subjects-dates">وقت - مواد وتواريخ</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Text Format and Color */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                نوع الخط
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={textFormat} onValueChange={setTextFormat} dir='rtl'>
                <SelectTrigger style={{fontWeight: fontWeightMap[textFormat]}}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="extralight" style={{fontWeight: fontWeightMap['extralight']}}>خفيف جداً</SelectItem>
                  <SelectItem value="light" style={{fontWeight: fontWeightMap['light']}}>خفيف</SelectItem>
                  <SelectItem value="regular" style={{fontWeight: fontWeightMap['regular']}}>عادي</SelectItem>
                  <SelectItem value="semibold" style={{fontWeight: fontWeightMap['semibold']}}>شبه عريض</SelectItem>
                  <SelectItem value="bold" style={{fontWeight: fontWeightMap['bold']}}>عريض</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                لون الجدول
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={tableColor} onValueChange={setTableColor} dir='rtl'>
                <SelectTrigger style={{color: colorMap[tableColor]}}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bluebits" style={{color: colorMap['bluebits']}}>BlueBits</SelectItem>
                  <SelectItem value="blue" style={{color: colorMap['blue']}}>أزرق</SelectItem>
                  <SelectItem value="green" style={{color: colorMap['green']}}>أخضر</SelectItem>
                  <SelectItem value="purple" style={{color: colorMap['purple']}}>بنفسجي</SelectItem>
                  <SelectItem value="red" style={{color: colorMap['red']}}>أحمر</SelectItem>
                  <SelectItem value="pink" style={{color: colorMap['pink']}}>وردي</SelectItem>
                  <SelectItem value="orange" style={{color: colorMap['orange']}}>برتقالي</SelectItem>
                  <SelectItem value="teal" style={{color: colorMap['teal']}}>أزرق مخضر</SelectItem>
                  <SelectItem value="indigo" style={{color: colorMap['indigo']}}>نيلي</SelectItem>
                  <SelectItem value="amber" style={{color: colorMap['amber']}}>عنبري</SelectItem>
                  <SelectItem value="emerald" style={{color: colorMap['emerald']}}>زمردي</SelectItem>
                  <SelectItem value="cyan" style={{color: colorMap['cyan']}}>سماوي</SelectItem>
                  <SelectItem value="black" style={{color: colorMap['black']}}>أسود</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Motivation Option */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              عبارة تحفيزية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="motivation"
                checked={includeMotivation}
                onCheckedChange={(checked) => setIncludeMotivation(checked === true)}
              />
              <Label htmlFor="motivation">إضافة عبارة تحفيزية للجدول</Label>
            </div>
          </CardContent>
        </Card>

        {/* Generate Buttons */}
        <div className="text-center space-y-4">
          <Button 
            onClick={generateTable}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transform transition hover:scale-105 mx-2"
            disabled={selectedSubjects.length === 0}
          >
            <Calendar className="h-5 w-5 ml-2" />
            توليد جدول الامتحانات
          </Button>
          
          <Button 
            onClick={downloadAsJPG}
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg mx-2"
            disabled={selectedSubjects.length === 0}
          >
            <Download className="h-5 w-5 ml-2" />
            تنزيل الجدول كصورة
          </Button>
          
          {selectedSubjects.length === 0 && (
            <p className="text-red-500 mt-2">يرجى اختيار مادة واحدة على الأقل</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
